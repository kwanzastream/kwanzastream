import requests
import uuid

BASE_URL = "http://localhost:3001"
REGISTER_ENDPOINT = "/api/auth/register"
TIMEOUT = 30

def test_postapiauthregisterwithvaliddata():
    # Generate unique user data to avoid duplication
    unique_suffix = str(uuid.uuid4())[:8]
    email = f"testuser{unique_suffix}@example.com"
    # Generate valid Angolan phone number format: +2449 followed by 8 digits
    phone = f"+2449{unique_suffix[:8].translate(str.maketrans('abcdef', '012345'))}"
    username = f"testuser{unique_suffix}"
    password = "StrongPassw0rd!"

    payload = {
        "email": email,
        "phone": phone,
        "username": username,
        "password": password
    }

    try:
        response = requests.post(
            BASE_URL + REGISTER_ENDPOINT,
            json=payload,
            timeout=TIMEOUT
        )
        # Validate response status code
        assert response.status_code == 201, f"Expected 201 but got {response.status_code}"

        json_data = response.json()
        # Check success field
        assert "success" in json_data and json_data["success"] is True, "Missing or false success field"
        # Check user data presence
        assert "user" in json_data and isinstance(json_data["user"], dict), "Missing or invalid user data"

        user = json_data["user"]
        # Validate returned user details match input where appropriate
        assert user.get("email") == email, "Returned user email does not match"
        assert user.get("phone") == phone, "Returned user phone does not match"
        assert user.get("username") == username, "Returned user username does not match"
        # Password must not be returned
        assert "password" not in user, "Password should not be returned in user data"

    finally:
        pass

test_postapiauthregisterwithvaliddata()
