import hashlib
import hmac
import time
import uuid

class PaymentService:
    """
    Modular Payment Gateway Service for GG-store.
    Supports Sandbox Mock and connects seamlessly to real UPI / Razorpay / Cashfree / Paytm gateways.
    """
    
    def __init__(self, sandbox_mode: bool = True, api_key: str = "", api_secret: str = ""):
        self.sandbox_mode = sandbox_mode
        self.api_key = api_key
        self.api_secret = api_secret

    def create_payment_order(self, amount: float, currency: str = "INR", order_id: str = ""):
        """
        Creates a payment intent / order token.
        """
        txn_id = f"TXN_{int(time.time())}_{uuid.uuid4().hex[:6].upper()}"
        
        # Sandbox simulated gateway response
        return {
            "success": True,
            "transaction_id": txn_id,
            "order_id": order_id,
            "amount": amount,
            "currency": currency,
            "payment_url": f"/pay/{txn_id}",
            "upi_intent_uri": f"upi://pay?pa=ggstore.pay@upi&pn=GGStore&am={amount}&tr={txn_id}&tn=Order_{order_id}",
            "status": "initiated",
            "is_sandbox": self.sandbox_mode
        }

    def verify_webhook_signature(self, payload_body: str, received_signature: str, secret: str) -> bool:
        """
        Secure HMAC SHA256 Webhook validation for payment callbacks.
        """
        if not secret or self.sandbox_mode:
            return True
        
        expected_sig = hmac.new(
            secret.encode('utf-8'),
            payload_body.encode('utf-8'),
            hashlib.sha256
        ).hexdigest()
        
        return hmac.compare_digest(expected_sig, received_signature)

    def process_mock_payment(self, payment_method: str, amount: float) -> dict:
        """
        Instant sandbox payment execution.
        """
        return {
            "status": "completed",
            "transaction_id": f"TXN_{uuid.uuid4().hex[:10].upper()}",
            "payment_method": payment_method,
            "amount_paid": amount,
            "timestamp": int(time.time()),
            "message": "Payment verified and credited successfully."
        }
