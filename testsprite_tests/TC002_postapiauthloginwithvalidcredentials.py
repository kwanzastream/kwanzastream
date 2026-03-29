import requests
import uuid

BASE_URL = "http://localhost:5000"
TIMEOUT = 30

def test_postapiauthloginwithvalidcredentials():
    # Generate unique user data
    unique_email = f"testuser_{uuid.uuid4().hex[:8]}@example.com"
    unique_phone = "+244912345678"
    unique_username = f"testuser_{uuid.uuid4().hex[:8]}"
    password = "StrongPass1"

    register_url = f"{BASE_URL}/api/auth/register"
    login_url = f"{BASE_URL}/api/auth/login"

    register_payload = {
        "email": unique_email,
        "phone": unique_phone,
        "username": unique_username,
        "password": password
    }
    headers = {
        "Content-Type": "application/json"
    }
    session = requests.Session()
    try:
        # Register user
        register_resp = session.post(register_url, json=register_payload, headers=headers, timeout=TIMEOUT)
        assert register_resp.status_code == 201, f"Expected 201 on register, got {register_resp.status_code}"
        register_json = register_resp.json()
        assert register_json.get("success") is True, "Register success not true"
        user = register_json.get("user")
        assert user is not None, "Register response missing user"

        # Login with email identifier and password
        login_payload = {
            "identifier": unique_email,
            "password": password
        }
        login_resp = session.post(login_url, json=login_payload, headers=headers, timeout=TIMEOUT)
        assert login_resp.status_code == 200, f"Expected 200 on login, got {login_resp.status_code}"
        login_json = login_resp.json()
        assert login_json.get("success") is True, "Login success not true"
        login_user = login_json.get("user")
        assert login_user is not None, "Login response missing user"

        # Check session cookies for JWT tokens (httpOnly cookie)
        cookie_jar = session.cookies
        cookie_names = [cookie.name for cookie in cookie_jar]
        # Based on PRD, refresh token should be set in httpOnly cookie
        refresh_token_cookie_found = any(name == "refreshToken" for name in cookie_names)
        assert refresh_token_cookie_found, "Session cookies missing refreshToken"

    finally:
        # Cleanup: Try to delete the user if API supports it (not specified here)
        pass

test_postapiauthloginwithvalidcredentials()
