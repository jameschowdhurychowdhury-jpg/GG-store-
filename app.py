import os
import uuid
from datetime import datetime
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import bcrypt

from config import Config
from models import (
    db, login_manager, User, Game, Product, Order, 
    WalletTransaction, SupportTicket, TicketMessage, Coupon
)
from services.payment_service import PaymentService
from services.topup_service import TopupService

payment_service = PaymentService(sandbox_mode=Config.PAYMENT_SANDBOX_MODE)
topup_service = TopupService(sandbox_mode=Config.TOPUP_SANDBOX_MODE)

def create_app(config_class=Config):
    app = Flask(__name__, static_folder='dist', static_url_path='')
    app.config.from_object(config_class)
    
    # Initialize extensions
    CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)
    db.init_app(app)
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))

    # --- HEALTH CHECK ---
    @app.route('/api/health', methods=['GET'])
    def health_check():
        return jsonify({
            "status": "healthy",
            "service": "GG-store Backend API",
            "timestamp": datetime.utcnow().isoformat()
        })

    # --- AUTHENTICATION ROUTES ---
    @app.route('/api/auth/register', methods=['POST'])
    def register():
        data = request.get_json() or {}
        name = data.get('name', '').strip()
        email = data.get('email', '').strip().lower()
        password = data.get('password', '')
        phone = data.get('phone', '').strip()

        if not name or not email or not password:
            return jsonify({"error": "Name, email and password are required"}), 400

        if User.query.filter_by(email=email).first():
            return jsonify({"error": "An account with this email already exists"}), 409

        pw_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        user = User(
            name=name,
            email=email,
            password_hash=pw_hash,
            phone=phone,
            wallet_balance=50.0 # Welcome bonus
        )
        db.session.add(user)
        db.session.flush()

        # Add welcome transaction
        bonus_txn = WalletTransaction(
            user_id=user.id,
            amount=50.0,
            transaction_type='credit',
            description='Welcome Sign-up Bonus',
            status='completed'
        )
        db.session.add(bonus_txn)
        db.session.commit()

        return jsonify({
            "success": True,
            "message": "Registration successful! ₹50 welcome bonus credited.",
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "phone": user.phone,
                "wallet_balance": user.wallet_balance,
                "is_admin": user.is_admin
            }
        }), 201

    @app.route('/api/auth/login', methods=['POST'])
    def login():
        data = request.get_json() or {}
        email = data.get('email', '').strip().lower()
        password = data.get('password', '')

        user = User.query.filter_by(email=email).first()
        if not user or not bcrypt.checkpw(password.encode('utf-8'), user.password_hash.encode('utf-8')):
            return jsonify({"error": "Invalid email or password"}), 401

        return jsonify({
            "success": True,
            "message": "Login successful",
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "phone": user.phone,
                "wallet_balance": user.wallet_balance,
                "is_admin": user.is_admin
            }
        })

    # --- GAMES & PRODUCTS CATALOG ---
    @app.route('/api/games', methods=['GET'])
    def get_games():
        category = request.args.get('category')
        search = request.args.get('search')
        
        query = Game.query.filter_by(is_active=True)
        if category and category.lower() != 'all':
            query = query.filter(Game.category.ilike(f"%{category}%"))
        if search:
            query = query.filter(Game.name.ilike(f"%{search}%"))

        games = query.all()
        return jsonify([
            {
                "id": g.id,
                "slug": g.slug,
                "name": g.name,
                "category": g.category,
                "currency_name": g.currency_name,
                "min_price": g.min_price,
                "image_url": g.image_url,
                "banner_url": g.banner_url,
                "is_hot": g.is_hot,
                "is_popular": g.is_popular,
                "publisher": g.publisher,
                "delivery_time": g.delivery_time,
                "description": g.description
            } for g in games
        ])

    @app.route('/api/games/<slug>', methods=['GET'])
    def get_game_detail(slug):
        game = Game.query.filter_by(slug=slug, is_active=True).first_or_404()
        products = Product.query.filter_by(game_id=game.id, is_active=True).order_by(Product.price.asc()).all()

        return jsonify({
            "id": game.id,
            "slug": game.slug,
            "name": game.name,
            "category": game.category,
            "currency_name": game.currency_name,
            "min_price": game.min_price,
            "image_url": game.image_url,
            "banner_url": game.banner_url,
            "is_hot": game.is_hot,
            "is_popular": game.is_popular,
            "publisher": game.publisher,
            "delivery_time": game.delivery_time,
            "description": game.description,
            "products": [
                {
                    "id": p.id,
                    "name": p.name,
                    "amount_label": p.amount_label,
                    "price": p.price,
                    "original_price": p.original_price,
                    "bonus": p.bonus,
                    "tag": p.tag,
                    "is_instant": p.is_instant
                } for p in products
            ]
        })

    # --- PLAYER ID VALIDATION ---
    @app.route('/api/player/validate', methods=['POST'])
    def validate_player():
        data = request.get_json() or {}
        game_slug = data.get('game_slug', '')
        player_id = data.get('player_id', '')
        zone_id = data.get('zone_id')

        res = topup_service.validate_player_id(game_slug, player_id, zone_id)
        return jsonify(res)

    # --- COUPONS ---
    @app.route('/api/coupons/apply', methods=['POST'])
    def apply_coupon():
        data = request.get_json() or {}
        code = data.get('code', '').strip().upper()
        amount = float(data.get('amount', 0.0))

        coupon = Coupon.query.filter_by(code=code, is_active=True).first()
        if not coupon:
            return jsonify({"valid": False, "message": "Invalid or expired coupon code."}), 400

        if amount < coupon.min_order_amount:
            return jsonify({"valid": False, "message": f"Minimum order amount for this coupon is ₹{coupon.min_order_amount:.0f}."}), 400

        if coupon.discount_type == 'percentage':
            discount = (amount * coupon.discount_value) / 100.0
            if coupon.max_discount:
                discount = min(discount, coupon.max_discount)
        else:
            discount = coupon.discount_value

        discount = min(discount, amount) # Don't exceed total
        final_amount = max(0.0, amount - discount)

        return jsonify({
            "valid": True,
            "code": coupon.code,
            "discount_amount": discount,
            "final_amount": final_amount,
            "message": f"Coupon {coupon.code} applied successfully! You save ₹{discount:.2f}"
        })

    # --- ORDERS & CHECKOUT ---
    @app.route('/api/orders/create', methods=['POST'])
    def create_order():
        data = request.get_json() or {}
        product_id = data.get('product_id')
        player_id = data.get('player_id', '').strip()
        zone_id = data.get('zone_id', '').strip()
        server = data.get('server', '').strip()
        character_name = data.get('character_name', '').strip()
        user_phone = data.get('user_phone', '').strip()
        user_email = data.get('user_email', '').strip()
        user_id = data.get('user_id')
        payment_method = data.get('payment_method', 'UPI')
        coupon_code = data.get('coupon_code')

        product = Product.query.get_or_404(product_id)
        game = Game.query.get(product.game_id)

        amount = product.price
        discount = 0.0

        if coupon_code:
            coupon = Coupon.query.filter_by(code=coupon_code.upper(), is_active=True).first()
            if coupon and amount >= coupon.min_order_amount:
                if coupon.discount_type == 'percentage':
                    discount = (amount * coupon.discount_value) / 100.0
                    if coupon.max_discount:
                        discount = min(discount, coupon.max_discount)
                else:
                    discount = coupon.discount_value
                coupon.times_used += 1

        final_amount = max(0.0, amount - discount)
        order_code = f"GG-{uuid.uuid4().hex[:8].upper()}"

        # If paying via wallet, verify balance
        if payment_method == 'GG Wallet' and user_id:
            user = User.query.get(user_id)
            if not user or user.wallet_balance < final_amount:
                return jsonify({"error": "Insufficient GG Wallet balance. Please top up or choose UPI."}), 400
            user.wallet_balance -= final_amount
            
            debit_txn = WalletTransaction(
                user_id=user.id,
                amount=final_amount,
                transaction_type='debit',
                description=f"Paid for {game.name} - {product.name}",
                reference_id=order_code,
                status='completed'
            )
            db.session.add(debit_txn)

        # Trigger mock payment processing
        pay_res = payment_service.process_mock_payment(payment_method, final_amount)

        # Trigger top-up dispatch
        topup_res = topup_service.dispatch_topup(order_code, game.name, product.name, player_id, zone_id)

        order = Order(
            order_id=order_code,
            user_id=user_id,
            product_id=product.id,
            game_name=game.name,
            product_name=product.name,
            player_id=player_id,
            zone_id=zone_id,
            server=server,
            character_name=character_name,
            user_phone=user_phone,
            user_email=user_email,
            amount=amount,
            discount_amount=discount,
            final_amount=final_amount,
            payment_method=payment_method,
            payment_status='completed',
            delivery_status=topup_res['delivery_status'],
            transaction_id=pay_res['transaction_id'],
            provider_reference=topup_res['provider_reference']
        )
        db.session.add(order)
        db.session.commit()

        return jsonify({
            "success": True,
            "order_id": order.order_id,
            "game_name": order.game_name,
            "product_name": order.product_name,
            "player_id": order.player_id,
            "final_amount": order.final_amount,
            "payment_method": order.payment_method,
            "delivery_status": order.delivery_status,
            "payment_status": order.payment_status,
            "transaction_id": order.transaction_id,
            "created_at": order.created_at.isoformat()
        }), 201

    @app.route('/api/orders/<order_id>', methods=['GET'])
    def track_order(order_id):
        order = Order.query.filter_by(order_id=order_id.strip()).first_or_404()
        return jsonify({
            "order_id": order.order_id,
            "game_name": order.game_name,
            "product_name": order.product_name,
            "player_id": order.player_id,
            "character_name": order.character_name,
            "amount": order.amount,
            "discount_amount": order.discount_amount,
            "final_amount": order.final_amount,
            "payment_method": order.payment_method,
            "payment_status": order.payment_status,
            "delivery_status": order.delivery_status,
            "transaction_id": order.transaction_id,
            "created_at": order.created_at.isoformat(),
            "updated_at": order.updated_at.isoformat() if order.updated_at else None
        })

    # --- WALLET TOP-UP & TRANSACTIONS ---
    @app.route('/api/wallet/topup', methods=['POST'])
    def topup_wallet():
        data = request.get_json() or {}
        user_id = data.get('user_id')
        amount = float(data.get('amount', 0.0))

        if not user_id or amount <= 0:
            return jsonify({"error": "Valid user and amount are required"}), 400

        user = User.query.get_or_404(user_id)
        user.wallet_balance += amount

        txn = WalletTransaction(
            user_id=user.id,
            amount=amount,
            transaction_type='credit',
            description=f"Wallet Recharge via UPI / Gateway",
            reference_id=f"WLT_{uuid.uuid4().hex[:6].upper()}",
            status='completed'
        )
        db.session.add(txn)
        db.session.commit()

        return jsonify({
            "success": True,
            "new_balance": user.wallet_balance,
            "transaction_id": txn.reference_id,
            "message": f"Successfully added ₹{amount:.2f} to your GG-Wallet."
        })

    # --- SUPPORT TICKETS ---
    @app.route('/api/support/tickets', methods=['POST'])
    def create_ticket():
        data = request.get_json() or {}
        user_id = data.get('user_id')
        user_name = data.get('user_name', 'Gamer')
        user_email = data.get('user_email', '')
        subject = data.get('subject', '').strip()
        category = data.get('category', 'Top-up Issue')
        order_id = data.get('order_id')
        message_text = data.get('message', '').strip()

        if not subject or not message_text:
            return jsonify({"error": "Subject and message are required"}), 400

        ticket_code = f"TKT-{uuid.uuid4().hex[:6].upper()}"
        ticket = SupportTicket(
            ticket_id=ticket_code,
            user_id=user_id,
            user_name=user_name,
            user_email=user_email,
            subject=subject,
            category=category,
            order_id=order_id,
            status='open',
            priority='medium'
        )
        db.session.add(ticket)
        db.session.flush()

        msg = TicketMessage(
            ticket_id=ticket.id,
            sender_type='user',
            sender_name=user_name,
            message=message_text
        )
        db.session.add(msg)
        db.session.commit()

        return jsonify({
            "success": True,
            "ticket_id": ticket.ticket_id,
            "status": ticket.status,
            "message": "Support ticket created. Our team will respond within 15 minutes."
        }), 201

    # --- ADMIN STATS & MANAGEMENT ---
    @app.route('/api/admin/stats', methods=['GET'])
    def admin_stats():
        total_orders = Order.query.count()
        total_users = User.query.count()
        total_revenue = db.session.query(db.func.sum(Order.final_amount)).scalar() or 0.0
        active_games = Game.query.filter_by(is_active=True).count()
        open_tickets = SupportTicket.query.filter(SupportTicket.status.in_(['open', 'in_progress'])).count()

        return jsonify({
            "total_orders": total_orders,
            "total_users": total_users,
            "total_revenue": round(total_revenue, 2),
            "active_games": active_games,
            "open_tickets": open_tickets,
            "success_rate": "99.8%"
        })

    # Serve static assets or frontend fallback in production
    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def serve(path):
        if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
            return send_from_directory(app.static_folder, path)
        else:
            return send_from_directory(app.static_folder, 'index.html')

    return app

app = create_app()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
