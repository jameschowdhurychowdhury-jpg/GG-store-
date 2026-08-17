from datetime import datetime
from . import db

class Order(db.Model):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.String(50), unique=True, nullable=False, index=True) # e.g. GG-849204
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True) # Nullable for guest checkout
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    
    game_name = db.Column(db.String(150), nullable=False)
    product_name = db.Column(db.String(150), nullable=False)
    
    # Player Credentials / Identifiers
    player_id = db.Column(db.String(100), nullable=False)
    zone_id = db.Column(db.String(50), nullable=True)
    server = db.Column(db.String(50), nullable=True)
    character_name = db.Column(db.String(100), nullable=True)
    user_phone = db.Column(db.String(20), nullable=True)
    user_email = db.Column(db.String(120), nullable=True)
    
    # Financials
    amount = db.Column(db.Float, nullable=False)
    discount_amount = db.Column(db.Float, default=0.0)
    final_amount = db.Column(db.Float, nullable=False)
    payment_method = db.Column(db.String(50), nullable=False) # UPI, Paytm, PhonePe, Wallet, NetBanking, Card
    
    # Statuses
    payment_status = db.Column(db.String(50), default='completed') # pending, completed, failed, refunded
    delivery_status = db.Column(db.String(50), default='completed') # pending, processing, completed, failed
    transaction_id = db.Column(db.String(100), nullable=True)
    
    # Notes & Top-up provider response
    provider_reference = db.Column(db.String(150), nullable=True)
    error_message = db.Column(db.Text, nullable=True)
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
