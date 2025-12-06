
const register = async (port) => {
    console.log(`Trying port ${port}...`);
    try {
        const response = await fetch(`http://localhost:${port}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: 'Test User',
                email: `test${Date.now()}@example.com`,
                password: 'password123',
                role: 'STUDENT'
            })
        });
        const data = await response.json();
        console.log(`Port ${port} response:`, JSON.stringify(data, null, 2));
    } catch (error) {
        console.log(`Port ${port} error:`, error.message);
    }
};

(async () => {
    await register(5000);
    await register(4000);
})();
