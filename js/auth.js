import { userRoute } from "./backend.js";

document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;

    const res = await fetch(userRoute, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email })
    });

    const data = await res.json();

    if (res.ok) {
        localStorage.setItem('user', JSON.stringify(data));
        window.location.href = '/dashboard.html';
    } else {
        alert('Signup failed');
    }
});
