import requests
import string
import random

BASE_URL = "http://localhost:5000"

def random_email():
    return f"test_{''.join(random.choices(string.ascii_lowercase+string.digits, k=8))}@example.com"

def random_phone():
    # Angola phone number format +244XXXXXXXXX (9 digits after +244)
    numbers = ''.join(random.choices(string.digits, k=9))
    return f"+244{numbers}"

def random_username():
    return "user_" + ''.join(random.choices(string.ascii_lowercase + string.digits, k=8))

def random_password():
    # Must contain uppercase, lowercase, digit, min length 8
    return "Aa1" + ''.join(random.choices(string.ascii_letters + string.digits, k=6))

def test_postapiauthrefreshwithvalidrefresh():
    session = requests.Session()
    # Register a new user
    register_payload = {
        "email": random_email(),
        "phone": random_phone(),
        "username": random_username(),
        "password": random_password()
    }
    register_resp = session.post(
        f"{BASE_URL}/api/auth/register",
        json=register_payload,
        timeout=30
    )
    assert register_resp.status_code == 201, f"Unexpected status code on register: {register_resp.status_code}"
    json_reg = register_resp.json()
    assert json_reg.get("success") is True
    assert "user" in json_reg
    assert isinstance(json_reg["user"], dict)

    # Login with the same credentials
    login_payload = {
        "identifier": register_payload["email"],
        "password": register_payload["password"]
    }
    login_resp = session.post(
        f"{BASE_URL}/api/auth/login",
        json=login_payload,
        timeout=30
    )
    assert login_resp.status_code == 200, f"Unexpected status code on login: {login_resp.status_code}"
    json_login = login_resp.json()
    assert json_login.get("success") is True
    assert "user" in json_login
    # Refresh token expected in httpOnly cookie, not in JSON

    # First method: POST /api/auth/refresh with session cookies (set by login)
    refresh_resp = session.post(
        f"{BASE_URL}/api/auth/refresh",
        timeout=30
    )
    assert refresh_resp.status_code == 200, f"Unexpected status code on refresh with cookies: {refresh_resp.status_code}"
    json_refresh = refresh_resp.json()
    assert json_refresh.get("success") is True

    # Test refresh endpoint with cookie only using a new session without login (should fail)
    with requests.Session() as session2:
        refresh_resp2 = session2.post(
            f"{BASE_URL}/api/auth/refresh",
            timeout=30
        )
        # Expect 401 Unauthorized because no valid refresh token cookie
        assert refresh_resp2.status_code == 401, f"Expected 401 status for refresh without token, got {refresh_resp2.status_code}"


test_postapiauthrefreshwithvalidrefresh()
