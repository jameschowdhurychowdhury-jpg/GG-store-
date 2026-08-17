from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager

db = SQLAlchemy()
login_manager = LoginManager()

from .user import User
from .game import Game
from .product import Product
from .order import Order
from .wallet import WalletTransaction
from .support import SupportTicket, TicketMessage
from .coupon import Coupon

__all__ = [
    'db',
    'login_manager',
    'User',
    'Game',
    'Product',
    'Order',
    'WalletTransaction',
    'SupportTicket',
    'TicketMessage',
    'Coupon'
]
