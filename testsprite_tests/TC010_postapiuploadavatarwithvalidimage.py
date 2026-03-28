import requests
import io
import random
import string

BASE_URL = "http://localhost:3001"
REGISTER_URL = f"{BASE_URL}/api/auth/register"
LOGIN_URL = f"{BASE_URL}/api/auth/login"
AVATAR_UPLOAD_URL = f"{BASE_URL}/api/upload/avatar"
USER_UPDATE_URL = f"{BASE_URL}/api/users/me"

TIMEOUT = 30

def random_suffix(length=6):
    return ''.join(random.choices(string.ascii_lowercase + string.digits, k=length))

def test_postapiuploadavatarwithvalidimage():
    session = requests.Session()
    suffix = random_suffix()
    try:
        # Step 1: Register a new user for the test
        register_payload = {
            "email": f"testavatarupload{suffix}@example.com",
            "phone": "244912345678",
            "username": f"testavataruploaduser{suffix}",
            "password": "StrongPassw0rd!"
        }
        register_resp = session.post(REGISTER_URL, json=register_payload, timeout=TIMEOUT)
        assert register_resp.status_code == 201, f"Expected 201 on register, got {register_resp.status_code} with message {register_resp.text}"
        register_data = register_resp.json()
        assert register_data.get("success") is True
        user = register_data.get("user")
        assert user and "id" in user

        # Step 2: Login to get credentials (httpOnly cookie set in session)
        login_payload = {
            "identifier": register_payload["email"],
            "password": register_payload["password"]
        }
        login_resp = session.post(LOGIN_URL, json=login_payload, timeout=TIMEOUT)
        assert login_resp.status_code == 200, f"Expected 200 on login, got {login_resp.status_code}"
        login_data = login_resp.json()
        assert login_data.get("success") is True
        assert "user" in login_data

        # Step 3: Prepare a valid jpeg image less than 5MB (use a small dummy jpeg byte stream)
        jpeg_data = (
            b'\xff\xd8\xff\xe0'    # SOI + APP0 marker
            b'\x00\x10'            # APP0 length
            b'JFIF\x00\x01\x01\x00\x00\x01\x00\x01\x00\x00'  # JFIF header
            b'\xff\xdb'            # DQT marker
            b'\x00\x43'            # DQT length
            + b'\x00' * 67         # DQT payload
            + b'\xff\xc0'          # SOF0 marker
            b'\x00\x11'            # SOF0 length
            + b'\x08\x00\x01\x00\x01\x03\x01\x11\x00\x02\x11\x01\x03\x11\x01'
            + b'\xff\xc4'          # DHT marker
            b'\x00\x14'            # DHT length
            + b'\x00' * 20         # DHT payload
            + b'\xff\xda'          # SOS marker
            b'\x00\x0c'            # SOS length
            + b'\x03\x01\x00\x02\x11\x03\x11\x00\x3f\x00'
            + b'\x00' * 10         # Image data
            + b'\xff\xd9'          # EOI marker
        )
        assert len(jpeg_data) < 5 * 1024 * 1024

        files = {
            "file": ("avatar.jpg", io.BytesIO(jpeg_data), "image/jpeg")
        }

        # Step 4: Upload avatar
        upload_resp = session.post(AVATAR_UPLOAD_URL, files=files, timeout=TIMEOUT)
        assert upload_resp.status_code == 200, f"Expected 200 on avatar upload, got {upload_resp.status_code}"
        upload_data = upload_resp.json()
        assert upload_data.get("success") is True
        avatar_url = upload_data.get("avatarUrl")
        assert avatar_url and isinstance(avatar_url, str) and avatar_url.startswith("http")

        # Step 5: Update user profile with new avatarUrl
        update_payload = {
            "avatarUrl": avatar_url
        }
        update_resp = session.put(USER_UPDATE_URL, json=update_payload, timeout=TIMEOUT)
        assert update_resp.status_code == 200, f"Expected 200 on user update, got {update_resp.status_code}"
        update_data = update_resp.json()
        updated_user = update_data.get("user")
        assert updated_user is not None
        assert updated_user.get("avatarUrl") == avatar_url

    finally:
        pass

test_postapiuploadavatarwithvalidimage()
