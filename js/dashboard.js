import { productRoute } from "./backend.js";

// Load and display products
async function loadProducts() {
    try {
        const response = await fetch(productRoute);
        const products = await response.json();

        const container = document.getElementById('product-list');
        container.innerHTML = '';

        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${product.image_url}" alt="${product.product_name}" 
                     onerror="this.src='https://via.placeholder.com/300x200?text=Product'">
                <div class="info">
                    <h4>${product.product_name}</h4>
                    <p>Rs. ${product.price}</p>
                    <button class="btn buy-btn">Buy Product</button>
                </div>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

// Add new product
document.getElementById('add-product').addEventListener('submit', async (e) => {
    e.preventDefault();

    const product_name = document.getElementById('product_name').value;
    const price = document.getElementById('price').value;
    const image_url = document.getElementById('image_url').value;

    try {
        await fetch(productRoute, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                product_name,
                price,
                image_url,
                created_by: user.id
            })
        });

        closeModal();
        loadProducts();
    } catch (error) {
        console.error('Error adding product:', error);
    }
});

// Load products when page loads
loadProducts();
