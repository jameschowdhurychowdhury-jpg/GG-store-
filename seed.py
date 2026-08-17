from datetime import datetime, timedelta
from app import create_app
from models import db, User, Game, Product, Coupon, Order
import bcrypt

def seed_database():
    app = create_app()
    with app.app_context():
        print("Creating tables...")
        db.create_all()

        # Seed Admin User
        admin = User.query.filter_by(email='admin@ggstore.in').first()
        if not admin:
            pw_hash = bcrypt.hashpw('Admin@1234'.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
            admin = User(
                name='GG-Store Admin',
                email='admin@ggstore.in',
                password_hash=pw_hash,
                phone='+919876543210',
                wallet_balance=5000.0,
                is_admin=True
            )
            db.session.add(admin)
            print("Admin user created: admin@ggstore.in / Admin@1234")

        # Seed Demo User
        demo_user = User.query.filter_by(email='gamer@ggstore.in').first()
        if not demo_user:
            pw_hash = bcrypt.hashpw('Gamer@1234'.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
            demo_user = User(
                name='Rahul Sharma',
                email='gamer@ggstore.in',
                password_hash=pw_hash,
                phone='+919812345678',
                wallet_balance=750.0,
                is_admin=False
            )
            db.session.add(demo_user)
            print("Demo user created: gamer@ggstore.in / Gamer@1234")

        # Seed Games & Products
        games_data = [
            {
                "slug": "free-fire-max",
                "name": "Free Fire MAX",
                "category": "Mobile Battle Royale",
                "currency_name": "Diamonds",
                "min_price": 75.0,
                "image_url": "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80",
                "banner_url": "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&auto=format&fit=crop&q=80",
                "is_hot": True,
                "is_popular": True,
                "publisher": "Garena",
                "delivery_time": "Instant (30s)",
                "description": "Instant top-up for Free Fire MAX Diamonds via Player ID. 100% official Garena direct delivery.",
                "products": [
                    {"name": "100 + 10 Bonus Diamonds", "amount_label": "110 Diamonds", "price": 75.0, "original_price": 80.0, "bonus": "+10 Bonus", "tag": "Starter"},
                    {"name": "310 + 31 Bonus Diamonds", "amount_label": "341 Diamonds", "price": 230.0, "original_price": 250.0, "bonus": "+31 Bonus", "tag": "Popular"},
                    {"name": "520 + 52 Bonus Diamonds", "amount_label": "572 Diamonds", "price": 380.0, "original_price": 420.0, "bonus": "+52 Bonus", "tag": "Best Value"},
                    {"name": "1060 + 106 Bonus Diamonds", "amount_label": "1166 Diamonds", "price": 760.0, "original_price": 850.0, "bonus": "+106 Bonus", "tag": "Pro Choice"},
                    {"name": "2180 + 218 Bonus Diamonds", "amount_label": "2398 Diamonds", "price": 1520.0, "original_price": 1700.0, "bonus": "+218 Bonus", "tag": "Super Saver"},
                    {"name": "Weekly Membership Pass", "amount_label": "Weekly Pass", "price": 160.0, "original_price": 190.0, "bonus": "450 D Total", "tag": "Hot Pass"},
                    {"name": "Monthly Membership Pass", "amount_label": "Monthly Pass", "price": 790.0, "original_price": 999.0, "bonus": "2600 D Total", "tag": "Mega Saver"}
                ]
            },
            {
                "slug": "bgmi",
                "name": "Battlegrounds Mobile India (BGMI)",
                "category": "Battle Royale",
                "currency_name": "UC",
                "min_price": 75.0,
                "image_url": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80",
                "banner_url": "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&auto=format&fit=crop&q=80",
                "is_hot": True,
                "is_popular": True,
                "publisher": "Krafton",
                "delivery_time": "Instant (45s)",
                "description": "Fast and safe BGMI Unknown Cash (UC) top-up via Character ID. Official Krafton authorized partner.",
                "products": [
                    {"name": "60 UC", "amount_label": "60 UC", "price": 75.0, "original_price": 89.0, "bonus": None, "tag": "Starter"},
                    {"name": "300 + 25 Bonus UC", "amount_label": "325 UC", "price": 380.0, "original_price": 420.0, "bonus": "+25 Bonus", "tag": "Popular"},
                    {"name": "600 + 60 Bonus UC (Royale Pass)", "amount_label": "660 UC", "price": 750.0, "original_price": 850.0, "bonus": "+60 Bonus", "tag": "Royale Pass"},
                    {"name": "1500 + 300 Bonus UC", "amount_label": "1800 UC", "price": 1850.0, "original_price": 2100.0, "bonus": "+300 Bonus", "tag": "Best Value"},
                    {"name": "3000 + 850 Bonus UC", "amount_label": "3850 UC", "price": 3700.0, "original_price": 4200.0, "bonus": "+850 Bonus", "tag": "Mega Pack"},
                    {"name": "6000 + 2100 Bonus UC", "amount_label": "8100 UC", "price": 7400.0, "original_price": 8500.0, "bonus": "+2100 Bonus", "tag": "Ultimate"}
                ]
            },
            {
                "slug": "genshin-impact",
                "name": "Genshin Impact",
                "category": "Action RPG",
                "currency_name": "Genesis Crystals",
                "min_price": 89.0,
                "image_url": "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=800&auto=format&fit=crop&q=80",
                "banner_url": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&auto=format&fit=crop&q=80",
                "is_hot": False,
                "is_popular": True,
                "publisher": "HoYoverse",
                "delivery_time": "Instant (1 min)",
                "description": "Genesis Crystals & Blessing of the Welkin Moon top-up directly to your UID and server.",
                "products": [
                    {"name": "Blessing of the Welkin Moon (30 Days)", "amount_label": "Welkin Moon", "price": 449.0, "original_price": 499.0, "bonus": "3000 Primogems Total", "tag": "Recommended"},
                    {"name": "60 Genesis Crystals", "amount_label": "60 Crystals", "price": 89.0, "original_price": 99.0, "bonus": "First Topup x2", "tag": "Starter"},
                    {"name": "300 + 30 Genesis Crystals", "amount_label": "330 Crystals", "price": 449.0, "original_price": 499.0, "bonus": "+30 Bonus", "tag": "Popular"},
                    {"name": "980 + 110 Genesis Crystals", "amount_label": "1090 Crystals", "price": 1399.0, "original_price": 1499.0, "bonus": "+110 Bonus", "tag": "Best Value"},
                    {"name": "1980 + 260 Genesis Crystals", "amount_label": "2240 Crystals", "price": 2799.0, "original_price": 2999.0, "bonus": "+260 Bonus", "tag": "Whale Pack"}
                ]
            },
            {
                "slug": "cod-mobile",
                "name": "Call of Duty: Mobile",
                "category": "FPS / Action",
                "currency_name": "CP (COD Points)",
                "min_price": 79.0,
                "image_url": "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&auto=format&fit=crop&q=80",
                "is_hot": False,
                "is_popular": True,
                "publisher": "Activision",
                "delivery_time": "Instant (45s)",
                "description": "Fast COD Points (CP) delivery via Player ID & Character Name.",
                "products": [
                    {"name": "80 CP", "amount_label": "80 CP", "price": 79.0, "original_price": 89.0, "bonus": None, "tag": "Starter"},
                    {"name": "420 CP (Battle Pass)", "amount_label": "420 CP", "price": 399.0, "original_price": 449.0, "bonus": "Battle Pass Ready", "tag": "Popular"},
                    {"name": "880 CP", "amount_label": "880 CP", "price": 799.0, "original_price": 899.0, "bonus": "+80 Bonus", "tag": "Best Value"},
                    {"name": "2400 CP", "amount_label": "2400 CP", "price": 1999.0, "original_price": 2299.0, "bonus": "+400 Bonus", "tag": "Pro Pack"}
                ]
            },
            {
                "slug": "google-play-code",
                "name": "Google Play Gift Card Code",
                "category": "Gift Cards",
                "currency_name": "INR Voucher",
                "min_price": 100.0,
                "image_url": "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80",
                "is_hot": True,
                "is_popular": True,
                "publisher": "Google",
                "delivery_time": "Instant SMS / Email",
                "description": "100% digital Google Play redeem codes. Usable for any Android game or in-app purchase.",
                "products": [
                    {"name": "₹100 Google Play Code", "amount_label": "₹100 Code", "price": 98.0, "original_price": 100.0, "bonus": "2% Discount", "tag": "Fast"},
                    {"name": "₹250 Google Play Code", "amount_label": "₹250 Code", "price": 245.0, "original_price": 250.0, "bonus": "2% Discount", "tag": "Popular"},
                    {"name": "₹500 Google Play Code", "amount_label": "₹500 Code", "price": 485.0, "original_price": 500.0, "bonus": "3% Discount", "tag": "Best Value"},
                    {"name": "₹1000 Google Play Code", "amount_label": "₹1000 Code", "price": 965.0, "original_price": 1000.0, "bonus": "3.5% Discount", "tag": "Mega Saver"}
                ]
            }
        ]

        for g in games_data:
            existing_game = Game.query.filter_by(slug=g['slug']).first()
            if not existing_game:
                game = Game(
                    slug=g['slug'],
                    name=g['name'],
                    category=g['category'],
                    currency_name=g['currency_name'],
                    min_price=g['min_price'],
                    image_url=g['image_url'],
                    banner_url=g.get('banner_url'),
                    is_hot=g.get('is_hot', False),
                    is_popular=g.get('is_popular', True),
                    publisher=g.get('publisher', 'Official'),
                    delivery_time=g.get('delivery_time', 'Instant (30s)'),
                    description=g['description']
                )
                db.session.add(game)
                db.session.flush() # get game.id

                for p in g['products']:
                    prod = Product(
                        game_id=game.id,
                        name=p['name'],
                        amount_label=p['amount_label'],
                        price=p['price'],
                        original_price=p.get('original_price'),
                        bonus=p.get('bonus'),
                        tag=p.get('tag')
                    )
                    db.session.add(prod)
                print(f"Added game {g['name']} with {len(g['products'])} products.")

        # Seed Coupons
        coupons = [
            {"code": "GGNEW50", "description": "Flat ₹50 OFF on first purchase above ₹200", "discount_type": "fixed", "discount_value": 50.0, "min_order_amount": 200.0},
            {"code": "DIWALI10", "description": "10% Instant Cashback/Discount up to ₹150", "discount_type": "percentage", "discount_value": 10.0, "max_discount": 150.0, "min_order_amount": 100.0},
            {"code": "FREEFIRE20", "description": "₹20 OFF on Free Fire Diamond packs", "discount_type": "fixed", "discount_value": 20.0, "min_order_amount": 150.0},
            {"code": "ROYALEPASS", "description": "₹35 OFF on BGMI UC 660 pack", "discount_type": "fixed", "discount_value": 35.0, "min_order_amount": 500.0}
        ]

        for c in coupons:
            if not Coupon.query.filter_by(code=c['code']).first():
                coupon = Coupon(
                    code=c['code'],
                    description=c['description'],
                    discount_type=c['discount_type'],
                    discount_value=c['discount_value'],
                    max_discount=c.get('max_discount'),
                    min_order_amount=c.get('min_order_amount', 0.0),
                    valid_until=datetime.utcnow() + timedelta(days=90)
                )
                db.session.add(coupon)
                print(f"Added coupon {c['code']}")

        db.session.commit()
        print("Database seeded successfully!")

if __name__ == '__main__':
    seed_database()
