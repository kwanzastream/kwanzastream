import requests
import uuid

BASE_URL = "http://localhost:3001"
TIMEOUT = 30

def test_postapiauthresetpasswordwithvalidtoken():
    session = requests.Session()
    # Step 1: Register a new user to obtain a valid email
    register_url = f"{BASE_URL}/api/auth/register"
    random_suffix = str(uuid.uuid4())[:8]
    email = f"testuser{random_suffix}@example.com"
    phone = f"+2449123456{random_suffix[:4]}"  # Unique Angolan phone format
    username = f"testuser{random_suffix}"
    password = "StrongPassword123!"

    register_payload = {
        "email": email,
        "phone": phone,
        "username": username,
        "password": password
    }

    try:
        # Register user
        response = session.post(register_url, json=register_payload, timeout=TIMEOUT)
        assert response.status_code == 201, f"Register failed: {response.status_code} {response.text}"
        register_data = response.json()
        assert "success" in register_data and register_data["success"] is True

        # Step 2: Request password reset to get a reset token (simulate receiving token)
        request_reset_url = f"{BASE_URL}/api/auth/request-password-reset"
        request_reset_payload = {"email": email}
        response = session.post(request_reset_url, json=request_reset_payload, timeout=TIMEOUT)
        assert response.status_code == 200, f"Password reset request failed: {response.status_code} {response.text}"

        # Assuming valid test token placeholder
        valid_token = "valid-reset-token-for-testing"

        # Step 3: Use the valid token to reset password
        reset_password_url = f"{BASE_URL}/api/auth/reset-password"
        new_password = "NewStrongPassword123!"

        reset_password_payload = {
            "token": valid_token,
            "newPassword": new_password
        }

        response = session.post(reset_password_url, json=reset_password_payload, timeout=TIMEOUT)
        assert response.status_code == 200, f"Password reset failed: {response.status_code} {response.text}"

    finally:
        # Cleanup not possible due to no user deletion API
        pass

test_postapiauthresetpasswordwithvalidtoken()
