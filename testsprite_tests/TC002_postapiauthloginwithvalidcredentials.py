import requests

BASE_URL = "http://localhost:3001"
TIMEOUT = 30


def test_postapiauthloginwithvalidcredentials():
    session = requests.Session()
    login_url = f"{BASE_URL}/api/auth/login"

    # Use a known valid user. Since no resource ID or user details are provided,
    # assume test user credentials exist. Adjust as necessary.
    valid_credentials = {
        "identifier": "testuser@example.com",
        "password": "TestPassword123!"
    }

    try:
        response = session.post(login_url, json=valid_credentials, timeout=TIMEOUT)
    except requests.RequestException as e:
        raise AssertionError(f"Login request failed: {e}")

    # Assert HTTP status code 200 OK
    assert response.status_code == 200, f"Expected status code 200, got {response.status_code}"

    # Assert response JSON structure
    try:
        json_data = response.json()
    except ValueError:
        raise AssertionError("Response is not valid JSON")

    # Check success field is True
    assert json_data.get("success") is True, "Login response 'success' field is not True"

    # Check user data presence
    user = json_data.get("user")
    assert user and isinstance(user, dict), "User data missing or invalid in response"

    # Check JWT presence in httpOnly cookie (commonly named 'jwt' or similar, check cookies)
    jwt_cookie = None
    cookie_names_of_interest = ['jwt', 'token', 'access_token', 'refresh_token']
    for cookie_name in cookie_names_of_interest:
        if cookie_name in session.cookies:
            jwt_cookie = session.cookies.get(cookie_name)
            break

    assert jwt_cookie is not None, "JWT token cookie not set in response cookies"

    print("test_postapiauthloginwithvalidcredentials passed.")


test_postapiauthloginwithvalidcredentials()
