import { paymentRoute, productRoute } from "./backend.js";
import { closeModal } from "./dashboard-modal.js";

const user = JSON.parse(localStorage.getItem('user'));

async function handleBuyProduct(e, price, productId) {
    e.preventDefault();

    try {
        const response = await fetch(paymentRoute, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                amount: price,
                user_id: user.id,
                product_id: productId,
            })
        });

        const html = await response.text();
        document.open();
        document.write(html);
        document.close();

    } catch (error) {
        console.error('Error buying product:', error);
        alert('Something went wrong. Please try again.');
    }
}

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

            // Create inner HTML for image and info except button
            card.innerHTML = `
                <img src="${product.image_url}" alt="${product.product_name}" 
                     onerror="this.src='https://via.placeholder.com/300x200?text=Product'">
                <div class="info">
                    <h4>${product.product_name}</h4>
                    <p>Rs. ${product.price}</p>
                </div>
            `;

            // Create the Buy button
            const buyBtn = document.createElement('button');
            buyBtn.className = 'btn buy-btn';
            buyBtn.textContent = 'Buy Product';

            // Attach click handler properly
            buyBtn.addEventListener('click', (e) => {
                handleBuyProduct(e, product.price, product.product_id);
            });

            // Append button inside info div
            card.querySelector('.info').appendChild(buyBtn);

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
