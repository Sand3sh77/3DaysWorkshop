// Check if user is logged in
const user = JSON.parse(localStorage.getItem('user'));
if (!user) {
    window.location.href = '/signup.html';
}

// Display username in navbar
document.getElementById('username-display').textContent = `Hello, ${user.username}`;

// Modal elements
const modal = document.getElementById('product-modal');
const addBtn = document.getElementById('add-product-btn');
const closeBtn = document.getElementById('close-modal');
const cancelBtn = document.getElementById('cancel-btn');

// Open modal
addBtn.addEventListener('click', () => {
    modal.classList.add('show');
});

// Close modal
export function closeModal() {
    modal.classList.remove('show');
    document.getElementById('add-product').reset();
}

closeBtn.addEventListener('click', closeModal);
cancelBtn.addEventListener('click', closeModal);

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});