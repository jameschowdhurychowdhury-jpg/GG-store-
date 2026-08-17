import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'gg-store-production-secret-key-2025')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///ggstore.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Payment Gateway Configuration (Safe Sandbox / Production toggle)
    PAYMENT_SANDBOX_MODE = os.getenv('PAYMENT_SANDBOX_MODE', 'True').lower() == 'true'
    PAYMENT_API_KEY = os.getenv('PAYMENT_API_KEY', '')
    PAYMENT_SECRET = os.getenv('PAYMENT_SECRET', '')
    PAYMENT_WEBHOOK_SECRET = os.getenv('PAYMENT_WEBHOOK_SECRET', '')
    
    # Authorized Top-up Provider Configuration
    TOPUP_SANDBOX_MODE = os.getenv('TOPUP_SANDBOX_MODE', 'True').lower() == 'true'
    TOPUP_API_KEY = os.getenv('TOPUP_API_KEY', '')
    TOPUP_API_URL = os.getenv('TOPUP_API_URL', '')
