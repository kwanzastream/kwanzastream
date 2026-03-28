import requests
import time

BASE_URL = "http://localhost:3001"
TIMEOUT = 30

def test_postapiauthrefreshwithvalidrefresh():
    session = requests.Session()
    timestamp = int(time.time())
    try:
        # Step 1: Register a new user to get valid credentials
        register_payload = {
            "email": f"testuser_refresh_{timestamp}@example.com",
            "phone": "+244900000000",
            "username": f"testuserrefresh{timestamp}",
            "password": "StrongPassw0rd!"
        }
        register_response = session.post(f"{BASE_URL}/api/auth/register", json=register_payload, timeout=TIMEOUT)
        assert register_response.status_code == 201, f"Register failed with status {register_response.status_code}"
        register_data = register_response.json()
        assert register_data.get("success") is True
        assert "user" in register_data

        # Step 2: Login with the registered user's credentials to get refresh token cookie
        login_payload = {
            "identifier": register_payload["email"],
            "password": register_payload["password"]
        }
        login_response = session.post(f"{BASE_URL}/api/auth/login", json=login_payload, timeout=TIMEOUT)
        assert login_response.status_code == 200, f"Login failed with status {login_response.status_code}"
        login_data = login_response.json()
        assert login_data.get("success") is True
        assert "user" in login_data

        # Cookies should include the refresh token as httpOnly cookie set by server
        refresh_cookie = login_response.cookies.get_dict()
        assert refresh_cookie, "No cookies received on login (refresh token missing)"

        # Step 3: Call refresh endpoint with the refresh token cookie set in session
        refresh_response = session.post(f"{BASE_URL}/api/auth/refresh", timeout=TIMEOUT)
        assert refresh_response.status_code == 200, f"Refresh token failed with status {refresh_response.status_code}"
        refresh_data = refresh_response.json()
        assert refresh_data.get("success") is True

        # Optional: Verify new access token cookie (if set in cookies)
        access_token_cookie = refresh_response.cookies.get_dict()
        assert access_token_cookie, "No cookies received on refresh (new access token missing)"

    finally:
        # Cleanup: Delete the created user to maintain test isolation
        # Not implemented due to PRD content limitations.
        pass

test_postapiauthrefreshwithvalidrefresh()