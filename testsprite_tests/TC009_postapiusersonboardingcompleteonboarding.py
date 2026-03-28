import requests
import uuid

BASE_URL = "http://localhost:3001"
TIMEOUT = 30

def test_post_api_users_onboarding_complete_onboarding():
    session = requests.Session()

    # Step 1: Register a new user to get credentials (email, username, password)
    unique_suffix = str(uuid.uuid4())[:8]
    email = f"testuser_{unique_suffix}@example.com"
    # Phone must be in valid format, e.g. 9 digits after +244
    phone = f"+24491234567"  # fixed valid phone
    username = f"testuser_{unique_suffix}"
    password = "StrongPassw0rd!"

    register_payload = {
        "email": email,
        "phone": phone,
        "username": username,
        "password": password
    }

    try:
        register_resp = session.post(
            f"{BASE_URL}/api/auth/register",
            json=register_payload,
            timeout=TIMEOUT
        )
        assert register_resp.status_code == 201, f"Register failed: {register_resp.text}"
        register_data = register_resp.json()
        assert register_data.get("success") is True
        assert "user" in register_data
    except Exception as e:
        session.close()
        raise

    # Step 2: Login with the registered user to get authentication cookies (JWT)
    login_payload = {
        "identifier": email,
        "password": password
    }
    try:
        login_resp = session.post(
            f"{BASE_URL}/api/auth/login",
            json=login_payload,
            timeout=TIMEOUT
        )
        assert login_resp.status_code == 200, f"Login failed: {login_resp.text}"
        login_data = login_resp.json()
        assert login_data.get("success") is True
        assert "user" in login_data
    except Exception as e:
        # Cleanup: delete the user if possible (not in requirements though)
        session.close()
        raise

    # Step 3: Complete onboarding with valid data
    onboarding_payload = {
        "displayName": "Test User Display",
        "username": f"onboard_{unique_suffix}",
        "bio": "This is a test bio for onboarding completion.",
        "interests": ["music", "gaming", "technology"]
    }

    try:
        onboarding_resp = session.post(
            f"{BASE_URL}/api/users/onboarding",
            json=onboarding_payload,
            timeout=TIMEOUT
        )
        assert onboarding_resp.status_code == 200, f"Onboarding failed: {onboarding_resp.text}"
        onboarding_data = onboarding_resp.json()
        assert onboarding_data.get("success") is True
        user = onboarding_data.get("user")
        assert user is not None
        assert user.get("displayName") == onboarding_payload["displayName"]
        assert user.get("username") == onboarding_payload["username"]
        assert user.get("bio") == onboarding_payload["bio"]
        # interests field may be inside user or not; check if present
        if "interests" in user:
            assert set(onboarding_payload["interests"]).issubset(set(user["interests"]))
    finally:
        # Cleanup: delete created user by logging out (no actual deletion endpoint in PRD)
        try:
            session.post(f"{BASE_URL}/api/auth/logout", timeout=TIMEOUT)
        except Exception:
            pass
        session.close()

test_post_api_users_onboarding_complete_onboarding()
