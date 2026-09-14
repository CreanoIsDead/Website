// --- Mock Product Database ---
const products = [
    {
        id: 1,
        title: "Minimalist Ceramic Lamp",
        category: "home",
        price: 120.00,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        title: "Acoustic Wood Headphones",
        category: "tech",
        price: 249.00,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        title: "Signature Chronograph Watch",
        category: "lifestyle",
        price: 185.00,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        title: "Handcrafted Ceramic Mug",
        category: "home",
        price: 32.00,
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 5,
        title: "Wireless Aluminum Speaker",
        category: "tech",
        price: 145.00,
        image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 6,
        title: "Minimalist Leather Backpack",
        category: "lifestyle",
        price: 210.00,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80"
    }
];

// --- App State ---
let cart = [];

// --- DOM Elements ---
const productGrid = document.getElementById('product-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const cartBtn = document.getElementById('cart-btn');
const closeCartBtn = document.getElementById('close-cart');
const cartDrawer = document.getElementById('cart-drawer');
const overlay = document.getElementById('overlay');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartSubtotalPrice = document.getElementById('cart-subtotal-price');
const newsletterForm = document.getElementById('newsletter-form');

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
    setupEventListeners();
});

// --- Render Products ---
function renderProducts(items) {
    productGrid.innerHTML = '';
    
    if(items.length === 0) {
        productGrid.innerHTML = `<p>No products found in this category.</p>`;
        return;
    }

    items.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}" loading="lazy">
            </div>
            <div class="product-info">
                <div>
                    <span class="product-category">${product.category}</span>
                    <h3 class="product-title">${product.title}</h3>
                </div>
                <div class="product-footer">
                    <span class="product-price">$${product.price.toFixed(2)}</span>
                    <button class="add-to-cart-btn" data-id="${product.id}">+ Add</button>
                </div>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

// --- Event Listeners Setup ---
function setupEventListeners() {
    // Filter Category Tabs
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            const filterValue = e.target.getAttribute('data-filter');
            if(filterValue === 'all') {
                renderProducts(products);
            } else {
                const filtered = products.filter(p => p.category === filterValue);
                renderProducts(filtered);
            }
        });
    });

    // Add to Cart Delegation
    productGrid.addEventListener('click', (e) => {
        if(e.target.classList.contains('add-to-cart-btn')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
        }
    });

    // Toggle Cart Drawer
    cartBtn.addEventListener('click', toggleCart);
    closeCartBtn.addEventListener('click', toggleCart);
    overlay.addEventListener('click', toggleCart);

    // Cart Management Delegation
    cartItemsContainer.addEventListener('click', (e) => {
        const id = parseInt(e.target.getAttribute('data-id'));
        if(e.target.classList.contains('increase-qty')) {
            changeQuantity(id, 1);
        } else if(e.target.classList.contains('decrease-qty')) {
            changeQuantity(id, -1);
        } else if(e.target.classList.contains('remove-item')) {
            removeFromCart(id);
        }
    });

    // Newsletter Submission
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for joining the Creano Club!');
        newsletterForm.reset();
    });
}

// --- Cart Logic ---
function toggleCart() {
    cartDrawer.classList.toggle('open');
    overlay.classList.toggle('active');
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if(existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    // Automatically slide out drawer when adding item for modern UX
    if(!cartDrawer.classList.contains('open')) {
        toggleCart();
    }
}

function changeQuantity(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if(item) {
        item.quantity += delta;
        if(item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartUI();
        }
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

function updateCartUI() {
    // Update Badge Count
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalCount;

    // Render Cart Items
    if(cart.length === 0) {
        cartItemsContainer.innerHTML = `<p class="empty-cart-msg">Your bag is currently empty.</p>`;
        cartSubtotalPrice.textContent = '$0.00';
        return;
    }

    cartItemsContainer.innerHTML = '';
    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price * item.quantity;
        const cartItemEl = document.createElement('div');
        cartItemEl.classList.add('cart-item');
        cartItemEl.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.title}</h4>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="cart-item-controls">
                    <button class="qty-btn decrease-qty" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn increase-qty" data-id="${item.id}">+</button>
                    <button class="remove-item" data-id="${item.id}">Remove</button>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(cartItemEl);
    });

    cartSubtotalPrice.textContent = `$${subtotal.toFixed(2)}`;
            }
                        
