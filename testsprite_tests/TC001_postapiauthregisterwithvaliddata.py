import requests
import string
import random

BASE_URL = "http://localhost:5000"
REGISTER_ENDPOINT = "/api/auth/register"
TIMEOUT = 30

def generate_random_string(length=8):
    letters = string.ascii_letters
    return ''.join(random.choice(letters) for _ in range(length))

def generate_valid_password():
    # Password must have uppercase, lowercase, digit, min 8 chars
    return "Aa1" + generate_random_string(5)

def generate_phone_number():
    # +244XXXXXXXXX (Angola country code +244, then 9 digits)
    digits = ''.join(random.choice(string.digits) for _ in range(9))
    return f"+244{digits}"

def test_postapiauthregisterwithvaliddata():
    email = f"testuser_{generate_random_string(5)}@example.com"
    phone = generate_phone_number()
    username = f"user_{generate_random_string(6)}"
    password = generate_valid_password()

    payload = {
        "email": email,
        "phone": phone,
        "username": username,
        "password": password
        # optional fields displayName, termsAccepted, ageConfirmed omitted to use server defaults
    }

    headers = {
        "Content-Type": "application/json"
    }

    try:
        response = requests.post(
            BASE_URL + REGISTER_ENDPOINT,
            json=payload,
            headers=headers,
            timeout=TIMEOUT
        )
    except requests.RequestException as e:
        assert False, f"Request failed: {e}"

    assert response.status_code == 201, f"Expected status 201 but got {response.status_code}"
    try:
        json_data = response.json()
    except ValueError:
        assert False, "Response is not valid JSON"

    # Validate JSON keys and values
    assert "success" in json_data, "'success' key missing in response JSON"
    assert json_data["success"] is True, f"Expected success true, got {json_data['success']}"
    # Access user key case insensitive
    user_key = None
    for key in json_data.keys():
        if key.lower() == 'user':
            user_key = key
            break
    assert user_key is not None, "'user' key missing in response JSON"
    user_obj = json_data[user_key]
    assert isinstance(user_obj, dict), "user must be an object"

    # Validate user object contains required fields email, phone, username at minimum
    assert "email" in user_obj and user_obj["email"] == email, "Returned user email does not match"
    assert "phone" in user_obj and user_obj["phone"] == phone, "Returned user phone does not match"
    assert "username" in user_obj and user_obj["username"] == username, "Returned user username does not match"

    # Removed assertions on accessToken, refreshToken in response JSON and Set-Cookie, as per PRD registration does not return tokens

test_postapiauthregisterwithvaliddata()
