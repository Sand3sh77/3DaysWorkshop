import { productRoute } from "./backend.js";

const user = JSON.parse(localStorage.getItem('user'));
if (!user) window.location.href = '/signup.html';
document.getElementById('welcome').innerText = `👋 Welcome, ${user.username}`;

async function loadProducts() {
    const res = await fetch(productRoute);
    const data = await res.json();

    const container = document.getElementById('product-list');
    container.innerHTML = '';

    data.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
      <img src="${p.image_url}" alt="${p.name}" />
      <div class="info">
        <h4>${p.name}</h4>
        <p>Rs. ${p.price}</p>
      </div>
    `;
        container.appendChild(card);
    });
}

document.getElementById('add-product').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const image_url = document.getElementById('image_url').value;

    await fetch(productRoute, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name,
            price,
            image_url,
            user_id: user.id
        })
    });

    e.target.reset();
    loadProducts();
});

loadProducts();
