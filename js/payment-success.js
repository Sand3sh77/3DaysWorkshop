import { orderRoute } from "./backend.js";

// Create order after successful payment
async function createOrderFromPayment() {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!user) {
        console.error('User not found');
        return;
    }

    // Get payment data from URL
    const params = new URLSearchParams(window.location.search);
    const dataParam = params.get('data');
    
    if (!dataParam) {
        console.error('No payment data found');
        return;
    }

    try {
        // Decode payment data
        const paymentData = JSON.parse(atob(dataParam));
        
        // Create order with simple mapping
        const orderData = {
            user_id: user.id,
            product_id: 1, // Default product ID
            total_amount: parseFloat(paymentData.total_amount)
        };

        const response = await fetch(orderRoute, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });

        const result = await response.json();
        
        if (response.ok) {
            // Show success
            document.getElementById('order-details').innerHTML = `
                <h4>Order Details</h4>
                <p><strong>Order ID:</strong> ${result.orderId}</p>
                <p><strong>Transaction ID:</strong> ${paymentData.transaction_uuid}</p>
                <p><strong>Amount:</strong> Rs. ${paymentData.total_amount}</p>
                <p><strong>Status:</strong> ${paymentData.status}</p>
                <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
            `;
            console.log('Order created successfully:', result);
        } else {
            throw new Error('Failed to create order');
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('order-details').innerHTML = `
            <p style="color: #ef4444;">Error creating order. Please contact support.</p>
        `;
    }
}

// Create order when page loads
document.addEventListener('DOMContentLoaded', createOrderFromPayment);
