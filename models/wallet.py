from datetime import datetime
from . import db

class WalletTransaction(db.Model):
    __tablename__ = 'wallet_transactions'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    
    amount = db.Column(db.Float, nullable=False)
    transaction_type = db.Column(db.String(20), nullable=False) # 'credit' or 'debit'
    description = db.Column(db.String(255), nullable=False)
    reference_id = db.Column(db.String(100), nullable=True) # order_id or payment_id
    
    status = db.Column(db.String(50), default='completed') # pending, completed, failed
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
