from datetime import datetime
from . import db

class SupportTicket(db.Model):
    __tablename__ = 'support_tickets'

    id = db.Column(db.Integer, primary_key=True)
    ticket_id = db.Column(db.String(50), unique=True, nullable=False, index=True) # e.g. TKT-9382
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    user_email = db.Column(db.String(120), nullable=True)
    user_name = db.Column(db.String(120), nullable=True)
    order_id = db.Column(db.String(50), nullable=True)
    
    subject = db.Column(db.String(200), nullable=False)
    category = db.Column(db.String(50), default='Top-up Issue') # Top-up Issue, Payment Failed, Refund, Account, Other
    status = db.Column(db.String(50), default='open') # open, in_progress, resolved, closed
    priority = db.Column(db.String(20), default='medium') # low, medium, high, urgent
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    messages = db.relationship('TicketMessage', backref='ticket', lazy=True, cascade="all, delete-orphan")


class TicketMessage(db.Model):
    __tablename__ = 'ticket_messages'

    id = db.Column(db.Integer, primary_key=True)
    ticket_id = db.Column(db.Integer, db.ForeignKey('support_tickets.id'), nullable=False)
    sender_type = db.Column(db.String(20), nullable=False) # 'user' or 'support' or 'system'
    sender_name = db.Column(db.String(100), nullable=False)
    message = db.Column(db.Text, nullable=False)
    attachment_url = db.Column(db.String(500), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
