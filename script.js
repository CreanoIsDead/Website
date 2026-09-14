// Product Database
const products = [
    {
        id: 1,
        title: "Minimalist Leather Backpack",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        title: "Classic Chronograph Watch",
        price: 199.50,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        title: "Ceramic Minimalist Coffee Mug",
        price: 24.00,
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        title: "Wireless Noise-Canceling Headphones",
        price: 249.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
    }
];

// Shopping Cart Array
let cart = [];

// DOM Elements
const productGrid = document.getElementById('product-grid');
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotalPrice = document.getElementById('cart-total-price');
const checkoutBtn = document.getElementById('checkout-btn');

// Initialize Store
function initStore() {
    renderProducts();
    setupEventListeners();
}

// Render Products to DOM
function renderProducts() {
    productGrid.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-img">
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

// Event Listeners setup
function setupEventListeners() {
    cartBtn.addEventListener('click', () => {
        cartModal.classList.add('active');
    });

    closeCartBtn.addEventListener('click', () => {
        cartModal.classList.remove('active');
    });

    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        alert('Thank you for your purchase from CreanoStore! Order placed successfully.');
        cart = [];
        updateCart();
        cartModal.classList.remove('active');
    });
}

// Add Item to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
    cartModal.classList.add('active');
}

// Remove Item from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Update Cart Display & Totals
function updateCart() {
    // Update Badge Count
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalCount;

    // Render Cart Items
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p class="empty-cart-msg">Your cart is currently empty.</p>`;
        cartTotalPrice.textContent = '$0.00';
        return;
    }

    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;

    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
        const cartItemEl = document.createElement('div');
        cartItemEl.classList.add('cart-item');
        cartItemEl.innerHTML = `
            <div class="cart-item-details">
                <h4>${item.title}</h4>
                <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
            </div>
            <button class="remove-item-btn" onclick="removeFromCart(${item.id})"><i class="fa-solid fa-trash"></i></button>
        `;
        cartItemsContainer.appendChild(cartItemEl);
    });

    cartTotalPrice.textContent = `$${totalPrice.toFixed(2)}`;
}

// Run app on load
document.addEventListener('DOMContentLoaded', initStore);
