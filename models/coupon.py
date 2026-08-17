from datetime import datetime
from . import db

class Coupon(db.Model):
    __tablename__ = 'coupons'

    id = db.Column(db.Integer, primary_key=True)
    code = db.Column(db.String(50), unique=True, nullable=False, index=True) # e.g. GGNEW50, DIWALI20
    description = db.Column(db.String(255), nullable=True)
    discount_type = db.Column(db.String(20), default='percentage') # percentage or fixed
    discount_value = db.Column(db.Float, nullable=False) # e.g. 10 (%) or 50 (INR)
    max_discount = db.Column(db.Float, nullable=True) # e.g. Max ₹100
    min_order_amount = db.Column(db.Float, default=0.0)
    
    is_active = db.Column(db.Boolean, default=True)
    usage_limit = db.Column(db.Integer, nullable=True)
    times_used = db.Column(db.Integer, default=0)
    
    valid_from = db.Column(db.DateTime, default=datetime.utcnow)
    valid_until = db.Column(db.DateTime, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
