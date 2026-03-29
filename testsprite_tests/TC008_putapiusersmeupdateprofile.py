import requests
import uuid
import random

BASE_URL = "http://localhost:5000"
REGISTER_URL = f"{BASE_URL}/api/auth/register"
LOGIN_URL = f"{BASE_URL}/api/auth/login"
UPDATE_PROFILE_URL = f"{BASE_URL}/api/users/me"
TIMEOUT = 30


def test_putapiusersmeupdateprofile():
    # Generate unique user data
    unique_suffix = str(uuid.uuid4()).replace('-', '')[:8]
    email = f"testuser_{unique_suffix}@example.com"
    # Generate valid Angolan phone number: +244 + 9 digits, e.g. +2449XXXXXXXX
    phone = "+2449" + ''.join(str(random.randint(0,9)) for _ in range(8))
    username_original = f"testuser_{unique_suffix}"
    password = "Aa12345678"
    displayName_original = "Test User Original"
    bio_original = "Original bio"

    # Register user
    register_payload = {
        "email": email,
        "phone": phone,
        "username": username_original,
        "password": password
    }
    register_resp = requests.post(REGISTER_URL, json=register_payload, timeout=TIMEOUT)
    assert register_resp.status_code == 201, f"Register failed: {register_resp.text}"
    register_data = register_resp.json()
    assert register_data.get("success") is True
    user = register_data.get("user")
    assert user is not None

    # Login user
    login_payload = {"identifier": email, "password": password}
    session = requests.Session()
    login_resp = session.post(LOGIN_URL, json=login_payload, timeout=TIMEOUT)
    assert login_resp.status_code == 200, f"Login failed: {login_resp.text}"
    login_data = login_resp.json()
    assert login_data.get("success") is True
    user_login = login_data.get("user")
    assert user_login is not None

    # Prepare updated profile data with new unique username
    username_updated = f"updated_{unique_suffix}"
    displayName_updated = "Updated DisplayName"
    bio_updated = "This is an updated bio for the user."
    avatar_url = "http://localhost:3000/images/avatar.png"

    update_payload = {
        "displayName": displayName_updated,
        "username": username_updated,
        "bio": bio_updated,
        "avatarUrl": avatar_url
    }

    try:
        # PUT update profile without Authorization header, the session manages cookie
        update_resp = session.put(UPDATE_PROFILE_URL, json=update_payload, timeout=TIMEOUT)
        assert update_resp.status_code == 200, f"Update profile failed: {update_resp.text}"
        updated_data = update_resp.json()
        updated_user = updated_data.get("user")
        assert updated_user is not None
        assert updated_user.get("displayName") == displayName_updated
        assert updated_user.get("username") == username_updated
        assert updated_user.get("bio") == bio_updated
        # avatarUrl returned may be null or the same URL, if included check matches
        avatar_returned = updated_user.get("avatarUrl")
        if avatar_url:
            assert avatar_returned == avatar_url or avatar_returned is None
    finally:
        # Cleanup: logout to clear session
        session.post(f"{BASE_URL}/api/auth/logout", timeout=TIMEOUT)


test_putapiusersmeupdateprofile()
