import requests

BASE_URL = "http://localhost:5000"
TIMEOUT = 30

def test_get_api_streams_user_by_id():
    # Unique test user data for registration
    register_payload = {
        "email": "testuser_tc015@example.com",
        "phone": "+244912345678",
        "username": "testuser_tc015",
        "password": "ValidPass123"
    }

    # Register user
    try:
        reg_resp = requests.post(
            f"{BASE_URL}/api/auth/register",
            json=register_payload,
            timeout=TIMEOUT
        )
        assert reg_resp.status_code == 201, f"Registration failed with status {reg_resp.status_code}"
        reg_json = reg_resp.json()
        assert reg_json.get("success") is True, "Registration success flag not true"
        user = reg_json.get("user")
        assert user and "id" in user, "User object or id missing in registration response"
        user_id = user["id"]

        # GET /api/streams/user/{userId}
        stream_resp = requests.get(
            f"{BASE_URL}/api/streams/user/{user_id}",
            timeout=TIMEOUT
        )

        # Expect 200 or 404 with JSON body, never 500
        assert stream_resp.status_code in (200, 404), f"Unexpected status code {stream_resp.status_code}"
        try:
            stream_json = stream_resp.json()
        except ValueError:
            assert False, "Response is not valid JSON"
    finally:
        # Cleanup: delete user if API provides such an endpoint (not in PRD)
        # No delete endpoint mentioned; skipping cleanup
        pass

test_get_api_streams_user_by_id()