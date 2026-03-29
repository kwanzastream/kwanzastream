import requests

BASE_URL = "http://localhost:5000"

def test_getapiauthmewithvalidtoken():
    # 1. Register a new user
    register_url = f"{BASE_URL}/api/auth/register"
    login_url = f"{BASE_URL}/api/auth/login"
    auth_me_url = f"{BASE_URL}/api/auth/me"

    # Use unique email and username to avoid conflicts
    import uuid
    unique_str = str(uuid.uuid4()).replace("-", "")[:8]
    email = f"test{unique_str}@example.com"
    # Provide a valid phone number format
    phone = "+244912345678"
    username = f"user{unique_str}"
    password = "Aa1strongPassword!"

    register_payload = {
        "email": email,
        "phone": phone,
        "username": username,
        "password": password
    }

    with requests.Session() as session:
        # Register user
        r = session.post(register_url, json=register_payload, timeout=30)
        assert r.status_code == 201, f"Register failed: {r.status_code} {r.text}"
        register_json = r.json()
        assert "success" in register_json and register_json["success"] is True
        assert "user" in register_json and register_json["user"]["email"] == email

        # Login user
        login_payload = {
            "identifier": email,
            "password": password
        }
        r = session.post(login_url, json=login_payload, timeout=30)
        assert r.status_code == 200, f"Login failed: {r.status_code} {r.text}"
        login_json = r.json()
        assert "success" in login_json and login_json["success"] is True
        assert "user" in login_json
        # accessToken may or may not be in JSON, but httpOnly cookie must be set
        cookies = session.cookies.get_dict()
        assert any(k.lower().find("token") != -1 for k in cookies.keys())

        # Try GET /api/auth/me with session cookies (which should hold accessToken httpOnly cookie)
        r = session.get(auth_me_url, timeout=30)
        assert r.status_code == 200, f"GET /api/auth/me failed: {r.status_code} {r.text}"
        me_json = r.json()
        assert "user" in me_json
        assert me_json["user"]["email"] == email
        assert me_json["user"]["username"] == username

        # Also try GET /api/auth/me with Authorization Bearer token if accessToken present in JSON
        access_token = login_json.get("accessToken")
        if access_token:
            headers = {"Authorization": f"Bearer {access_token}"}
            r = requests.get(auth_me_url, headers=headers, timeout=30)
            assert r.status_code == 200, f"GET /api/auth/me with Bearer token failed: {r.status_code} {r.text}"
            me_json_token = r.json()
            assert "user" in me_json_token
            assert me_json_token["user"]["email"] == email
            assert me_json_token["user"]["username"] == username

test_getapiauthmewithvalidtoken()
