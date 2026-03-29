import requests
import string
import random

BASE_URL = "http://localhost:5000"
TIMEOUT = 30


def random_username(length=12):
    # Generate a username with lowercase letters and digits
    chars = string.ascii_lowercase + string.digits
    return ''.join(random.choice(chars) for _ in range(length))


def test_post_api_users_onboarding_complete_onboarding():
    session = requests.Session()
    try:
        # Step 1: Register user
        username_reg = random_username()
        register_payload = {
            "email": f"{username_reg}@example.com",
            "phone": "+244912345678",
            "username": username_reg,
            "password": "Password1"
        }
        reg_response = session.post(f"{BASE_URL}/api/auth/register", json=register_payload, timeout=TIMEOUT)
        assert reg_response.status_code == 201, f"Register failed: {reg_response.text}"
        reg_json = reg_response.json()
        assert reg_json.get("success") is True
        assert "user" in reg_json
        user_id = reg_json["user"].get("id")
        assert user_id is not None

        # Step 2: Login user
        login_payload = {
            "identifier": username_reg,
            "password": "Password1"
        }
        login_response = session.post(f"{BASE_URL}/api/auth/login", json=login_payload, timeout=TIMEOUT)
        assert login_response.status_code == 200, f"Login failed: {login_response.text}"
        login_json = login_response.json()
        assert login_json.get("success") is True
        assert "user" in login_json

        # Authorization is via httpOnly cookies set in the session

        # Step 3: POST /api/users/onboarding with profile data
        onboard_username = random_username()
        onboarding_payload = {
            "displayName": "Test DisplayName",
            "username": onboard_username,
            "bio": "This is a test bio.",
            "interests": ["testing", "streaming"]
        }
        onboarding_response = session.post(f"{BASE_URL}/api/users/onboarding", json=onboarding_payload, timeout=TIMEOUT)
        assert onboarding_response.status_code == 200, f"Onboarding failed: {onboarding_response.text}"
        onboard_json = onboarding_response.json()
        assert onboard_json.get("success") is True
        user_data = onboard_json.get("user")
        assert user_data is not None
        assert user_data.get("username") == onboard_username
        assert user_data.get("displayName") == "Test DisplayName"
        assert user_data.get("bio") == "This is a test bio."
        assert isinstance(user_data.get("interests"), list)
        assert len(user_data.get("interests")) >= 1
        assert user_data.get("onboardingCompleted") is True

    finally:
        # Cleanup: attempt to delete the registered user (if API supports)
        # Assume DELETE /api/users/me for cleanup authorization needed
        # If such endpoint doesn't exist, skip deletion
        try:
            session.delete(f"{BASE_URL}/api/users/me", timeout=TIMEOUT)
        except Exception:
            pass


test_post_api_users_onboarding_complete_onboarding()