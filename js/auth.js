import { userRoute } from "./backend.js";

// Handle signup form submission
document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    
    try {
        // Send signup request
        const response = await fetch(userRoute, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email })
        });
        
        const user = await response.json();
        
        if (response.ok) {
            // Save user data and redirect
            localStorage.setItem('user', JSON.stringify(user));
            window.location.href = '/dashboard.html';
        } else {
            alert('Signup failed. Please try again.');
        }
    } catch (error) {
        console.error('Error during signup:', error);
        alert('Signup failed. Please try again.');
    }
});
