import requests
import uuid

BASE_URL = "http://localhost:3001"
TIMEOUT = 30

def test_put_api_users_me_update_profile():
    session = requests.Session()
    try:
        # Step 1: Register a new user to get auth
        email = f"user_{uuid.uuid4().hex[:8]}@example.com"
        phone = f"+244{str(900000000 + int(uuid.uuid4().int % 99999999)).zfill(8)}"
        username = f"user_{uuid.uuid4().hex[:8]}"
        password = "StrongPassw0rd!"

        register_payload = {
            "email": email,
            "phone": phone,
            "username": username,
            "password": password
        }
        register_resp = session.post(f"{BASE_URL}/api/auth/register", json=register_payload, timeout=TIMEOUT)
        assert register_resp.status_code == 201, f"Registration failed: {register_resp.text}"
        register_json = register_resp.json()
        assert "success" in register_json and register_json["success"] == True
        assert "user" in register_json

        # Step 2: Login to get session cookies (JWT, refresh token cookie)
        login_payload = {
            "identifier": email,
            "password": password
        }
        login_resp = session.post(f"{BASE_URL}/api/auth/login", json=login_payload, timeout=TIMEOUT)
        assert login_resp.status_code == 200, f"Login failed: {login_resp.text}"
        login_json = login_resp.json()
        assert "success" in login_json and login_json["success"] == True
        assert "user" in login_json

        # Step 3: Prepare updated profile data
        updated_profile = {
            "username": f"{username}_updated",
            "displayName": "Updated Display Name",
            "bio": "This is an updated bio for test.",
            "avatarUrl": "http://localhost:3000/static/avatar/sample.jpg"
        }

        # Step 4: Update user profile with PUT /api/users/me
        headers = {
            "Content-Type": "application/json"
        }
        update_resp = session.put(f"{BASE_URL}/api/users/me", json=updated_profile, headers=headers, timeout=TIMEOUT)
        assert update_resp.status_code == 200, f"Profile update failed: {update_resp.text}"
        update_json = update_resp.json()
        assert "user" in update_json
        user = update_json["user"]
        assert user.get("username") == updated_profile["username"]
        assert user.get("displayName") == updated_profile["displayName"]
        assert user.get("bio") == updated_profile["bio"]
        assert user.get("avatarUrl") == updated_profile["avatarUrl"]
    finally:
        # Cleanup: Attempt to delete the created user if API supports it (not specified, so just pass)
        pass

test_put_api_users_me_update_profile()
