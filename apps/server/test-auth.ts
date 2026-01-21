import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:5000/api/auth';

async function testAuth() {
    const email = `test_${Date.now()}@example.com`;
    const password = 'password123';
    const name = 'Test Verification';

    console.log('--- Testing Registration ---');
    try {
        const registerRes = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name }),
        });

        const registerData = await registerRes.json();
        console.log('Status:', registerRes.status);
        console.log('Response:', registerData);

        if (registerRes.status !== 201) {
            console.error('Registration Failed');
            return;
        }

        console.log('\n--- Testing Login ---');
        const loginRes = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const loginData = await loginRes.json();
        console.log('Status:', loginRes.status);
        console.log('Response:', loginData);

        if (loginRes.status === 200 && loginData.token) {
            console.log('\n--- SUCCESS: Authentication Flow Verified ---');
        } else {
            console.error('\n--- FAILED: Login Failed ---');
        }

    } catch (error) {
        console.error('Test Error:', error);
    }
}

testAuth();
