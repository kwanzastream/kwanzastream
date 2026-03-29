import requests
import uuid

BASE_URL = "http://localhost:5000"
TIMEOUT = 30

def test_postapiauthlogoutclearsession():
    session = requests.Session()
    email = f'test_{uuid.uuid4().hex[:8]}@example.com'
    phone = "+244912345678"
    username = f'testuser_{uuid.uuid4().hex[:8]}'
    password = "StrongPass1"

    register_payload = {
        "email": email,
        "phone": phone,
        "username": username,
        "password": password
    }

    # Register user
    try:
        register_resp = session.post(
            f"{BASE_URL}/api/auth/register", json=register_payload, timeout=TIMEOUT
        )
        assert register_resp.status_code == 201, f"Register failed: {register_resp.text}"
        register_json = register_resp.json()
        assert register_json.get("success") is True
        user = register_json.get("user")
        assert user and user.get("email") == email

        # Login user
        login_payload = {
            "identifier": email,
            "password": password
        }
        login_resp = session.post(
            f"{BASE_URL}/api/auth/login", json=login_payload, timeout=TIMEOUT
        )
        assert login_resp.status_code == 200, f"Login failed: {login_resp.text}"
        login_json = login_resp.json()
        assert login_json.get("success") is True
        login_user = login_json.get("user")
        assert login_user and login_user.get("email") == email

        # POST /api/auth/logout
        logout_resp = session.post(
            f"{BASE_URL}/api/auth/logout", timeout=TIMEOUT
        )
        assert logout_resp.status_code == 200, f"Logout failed: {logout_resp.text}"
        logout_json = logout_resp.json()
        assert logout_json.get("success") is True

        # POST /api/auth/refresh (should return 401 Unauthorized after logout)
        refresh_resp = session.post(
            f"{BASE_URL}/api/auth/refresh", timeout=TIMEOUT
        )
        assert refresh_resp.status_code == 401, f"Refresh post logout expected 401 but got {refresh_resp.status_code}, response: {refresh_resp.text}"

    finally:
        session.close()

test_postapiauthlogoutclearsession()