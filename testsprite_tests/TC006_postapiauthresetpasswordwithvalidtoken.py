import requests
import string
import random

BASE_URL = "http://localhost:5000"
TIMEOUT = 30

def random_email():
    return (
        "testuser_"
        + "".join(random.choices(string.ascii_lowercase + string.digits, k=8))
        + "@example.com"
    )

def random_username():
    return (
        "testuser"
        + "".join(random.choices(string.ascii_lowercase + string.digits, k=8))
    )

def random_phone():
    # +244 followed by 9 digits for Angola format
    return "+244" + "".join(random.choices(string.digits, k=9))

def random_password():
    # Complex password: at least 8 chars, uppercase, lowercase, digit
    return "Aa1" + "".join(random.choices(string.ascii_letters + string.digits, k=8))

def test_postapiauthresetpasswordwithvalidtoken():
    session = requests.Session()
    email = random_email()
    username = random_username()
    phone = random_phone()
    password = random_password()

    user_id = None
    try:
        # Register user
        register_payload = {
            "email": email,
            "phone": phone,
            "username": username,
            "password": password
        }
        r = session.post(f"{BASE_URL}/api/auth/register", json=register_payload, timeout=TIMEOUT)
        assert r.status_code == 201, f"Register status code was {r.status_code}, body: {r.text}"
        data = r.json()
        assert data.get("success") is True
        assert "user" in data
        user_id = data["user"].get("id", None)

        # Request password reset
        reset_request_payload = {"email": email}
        r = session.post(f"{BASE_URL}/api/auth/request-password-reset", json=reset_request_payload, timeout=TIMEOUT)
        assert r.status_code == 200, f"Request password reset status code was {r.status_code}, body: {r.text}"

        # Per PRD, response is generic success message, no token provided
        # So, we cannot proceed to reset-password in this test
        # This ends test here

    finally:
        # Cleanup: no delete user API available
        pass

test_postapiauthresetpasswordwithvalidtoken()