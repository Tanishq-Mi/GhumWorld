// Simple script to test backend connection
const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function testConnection() {
  console.log('Testing backend connection...\n');

  try {
    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await axios.get(`${API_URL}/health`);
    console.log('✅ Health check passed:', healthResponse.data);
    console.log('');

    // Test signup
    console.log('2. Testing signup endpoint...');
    const testEmail = `test${Date.now()}@test.com`;
    const signupResponse = await axios.post(`${API_URL}/auth/signup`, {
      name: 'Test User',
      email: testEmail,
      password: 'test123'
    });
    console.log('✅ Signup test passed:', signupResponse.data.message);
    console.log('');

    // Test login
    console.log('3. Testing login endpoint...');
    const loginResponse = await axios.post(`${API_URL}/auth/login`, {
      email: testEmail,
      password: 'test123'
    });
    console.log('✅ Login test passed:', loginResponse.data.message);
    console.log('');

    console.log('🎉 All tests passed! Backend is working correctly.');
  } catch (error) {
    console.error('❌ Test failed:');
    if (error.code === 'ECONNREFUSED') {
      console.error('   Backend server is not running on port 5000');
      console.error('   Please run: npm run dev');
    } else if (error.response) {
      console.error('   Status:', error.response.status);
      console.error('   Message:', error.response.data.message);
    } else {
      console.error('   Error:', error.message);
    }
    process.exit(1);
  }
}

testConnection();
