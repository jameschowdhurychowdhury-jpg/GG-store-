from datetime import datetime
from . import db

class Game(db.Model):
    __tablename__ = 'games'

    id = db.Column(db.Integer, primary_key=True)
    slug = db.Column(db.String(100), unique=True, nullable=False, index=True)
    name = db.Column(db.String(150), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    currency_name = db.Column(db.String(50), nullable=False) # e.g. Diamonds, UC
    min_price = db.Column(db.Float, default=0.0)
    image_url = db.Column(db.String(500), nullable=False)
    banner_url = db.Column(db.String(500), nullable=True)
    is_hot = db.Column(db.Boolean, default=False)
    is_popular = db.Column(db.Boolean, default=True)
    description = db.Column(db.Text, nullable=True)
    publisher = db.Column(db.String(100), default='Official')
    delivery_time = db.Column(db.String(50), default='Instant (30s)')
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    products = db.relationship('Product', backref='game', lazy=True, cascade="all, delete-orphan")
