from datetime import datetime
from . import db

class Product(db.Model):
    __tablename__ = 'products'

    id = db.Column(db.Integer, primary_key=True)
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'), nullable=False)
    name = db.Column(db.String(150), nullable=False)
    amount_label = db.Column(db.String(100), nullable=False) # e.g. "100 + 10 Diamonds"
    price = db.Column(db.Float, nullable=False)
    original_price = db.Column(db.Float, nullable=True)
    bonus = db.Column(db.String(50), nullable=True)
    tag = db.Column(db.String(50), nullable=True) # e.g. "Popular", "Best Value"
    is_instant = db.Column(db.Boolean, default=True)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    orders = db.relationship('Order', backref='product', lazy=True)
