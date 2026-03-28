import requests

BASE_URL = "http://localhost:3001"
REGISTER_ENDPOINT = f"{BASE_URL}/api/auth/register"
LOGIN_ENDPOINT = f"{BASE_URL}/api/auth/login"
ME_ENDPOINT = f"{BASE_URL}/api/auth/me"
TIMEOUT = 30

def test_getapiauthmewithvalidtoken():
    # Test user credentials for registration and login
    user_data = {
        "email": "testuser_tc007@example.com",
        "phone": "+244912345678",
        "username": "testuser_tc007",
        "password": "StrongP@ssword1"
    }

    session = requests.Session()
    try:
        # Register a new user
        register_resp = session.post(REGISTER_ENDPOINT, json=user_data, timeout=TIMEOUT)
        assert register_resp.status_code == 201, f"Registration failed: {register_resp.text}"
        register_json = register_resp.json()
        assert register_json.get("success") is True
        assert "user" in register_json

        login_payload = {
            "identifier": user_data["email"],
            "password": user_data["password"]
        }
        # Login to get JWT cookie
        login_resp = session.post(LOGIN_ENDPOINT, json=login_payload, timeout=TIMEOUT)
        assert login_resp.status_code == 200, f"Login failed: {login_resp.text}"
        login_json = login_resp.json()
        assert login_json.get("success") is True
        assert "user" in login_json

        # The session now carries the httpOnly cookie set by the server.

        # Access authenticated user profile endpoint
        me_resp = session.get(ME_ENDPOINT, timeout=TIMEOUT)
        assert me_resp.status_code == 200, f"Authenticated profile access failed: {me_resp.text}"
        me_json = me_resp.json()
        assert "user" in me_json
        # Validate fields presence
        user = me_json["user"]
        assert user.get("email") == user_data["email"]
        assert user.get("username") == user_data["username"]

    finally:
        # Cleanup: delete created user if possible
        # Not provided in PRD, so skipping actual delete call
        pass

test_getapiauthmewithvalidtoken()