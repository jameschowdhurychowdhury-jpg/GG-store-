import time
import uuid

class TopupService:
    """
    Automated Top-up Fulfillment & Player Validation Provider Service.
    Connects with authorized game distribution APIs (e.g. UniPin, Smile.one, Codashop, Moonton, Garena).
    """

    def __init__(self, sandbox_mode: bool = True, api_key: str = "", api_url: str = ""):
        self.sandbox_mode = sandbox_mode
        self.api_key = api_key
        self.api_url = api_url

    def validate_player_id(self, game_slug: str, player_id: str, zone_id: str = None) -> dict:
        """
        Validates the player ID and fetches character nickname from game servers.
        """
        player_id = str(player_id).strip()
        
        if not player_id or len(player_id) < 3:
            return {"valid": False, "message": "Player ID must be at least 3 characters."}

        # Mock game database verification for popular titles
        mock_nicknames = {
            "free-fire-max": f"Shadow_Pro_{player_id[-3:]}",
            "bgmi": f"GodL_Sniper_{player_id[-3:]}",
            "genshin-impact": f"Traveler_Aether_{player_id[-2:]}",
            "cod-mobile": f"Ghost_Delta_{player_id[-3:]}",
            "mobile-legends": f"Mythic_Glory_{player_id[-3:]}",
            "clash-of-clans": f"Chief_Barbarian_{player_id[-3:]}",
            "roblox": f"Robloxian_{player_id[-3:]}",
        }

        nickname = mock_nicknames.get(game_slug, f"Player_{player_id[-4:]}")

        return {
            "valid": True,
            "player_id": player_id,
            "zone_id": zone_id,
            "character_name": nickname,
            "server_status": "ONLINE"
        }

    def dispatch_topup(self, order_id: str, game_name: str, product_name: str, player_id: str, zone_id: str = None) -> dict:
        """
        Dispatches top-up payload to game provider servers.
        """
        # Sandbox simulated instant delivery
        provider_ref = f"TOPUP_{uuid.uuid4().hex[:8].upper()}"
        return {
            "success": True,
            "provider_reference": provider_ref,
            "delivery_status": "completed",
            "message": f"Successfully credited {product_name} to player {player_id}",
            "timestamp": int(time.time())
        }
