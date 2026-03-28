import requests

BASE_URL = "http://localhost:3001"
TIMEOUT = 30

def test_postapiauthlogoutclearsession():
    session = requests.Session()
    try:
        # Step 1: Register a new user (to have a valid session)
        register_payload = {
            "email": "testuserlogout@example.com",
            "phone": "+244912345678",
            "username": "testuserlogout",
            "password": "StrongPassw0rd!"
        }
        register_resp = session.post(f"{BASE_URL}/api/auth/register", json=register_payload, timeout=TIMEOUT)
        assert register_resp.status_code == 201, f"Register failed: {register_resp.text}"
        register_data = register_resp.json()
        assert register_data.get("success") is True
        assert "user" in register_data

        # Step 2: Login with the registered user to get auth cookies (refresh token cookie)
        login_payload = {
            "identifier": register_payload["email"],
            "password": register_payload["password"]
        }
        login_resp = session.post(f"{BASE_URL}/api/auth/login", json=login_payload, timeout=TIMEOUT)
        assert login_resp.status_code == 200, f"Login failed: {login_resp.text}"
        login_data = login_resp.json()
        assert login_data.get("success") is True
        assert "user" in login_data

        # Step 3: Call logout endpoint to revoke refresh token and clear cookies
        logout_resp = session.post(f"{BASE_URL}/api/auth/logout", timeout=TIMEOUT)
        assert logout_resp.status_code == 200, f"Logout failed: {logout_resp.text}"
        logout_data = logout_resp.json()
        assert logout_data.get("success") is True

        # Step 4: Verify that the refresh token cookie is cleared or revoked
        refresh_token_cookie = None
        for cookie in logout_resp.cookies:
            if "refresh" in cookie.name.lower():
                refresh_token_cookie = cookie
                break
        if refresh_token_cookie:
            expires = refresh_token_cookie.expires
            assert refresh_token_cookie.value == "" or (expires is not None and expires <= 0)

        # Step 5: Attempt refresh token usage after logout should fail (optional extra check)
        refresh_resp = session.post(f"{BASE_URL}/api/auth/refresh", timeout=TIMEOUT)
        assert refresh_resp.status_code == 401, "Expected failed refresh after logout"

    finally:
        pass

test_postapiauthlogoutclearsession()
