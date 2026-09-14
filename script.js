// --- Digital Product Database ---
const products = [
    {
        id: 1,
        title: "SaaS Dashboard UI Kit",
        category: "ui-kits",
        price: 49.00,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        title: "Next.js Fullstack Boilerplate",
        category: "code",
        price: 89.00,
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        title: "Ambient UI Sound Effects Pack",
        category: "audio",
        price: 24.00,
        image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        title: "Mobile App Wireframe System",
        category: "ui-kits",
        price: 35.00,
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 5,
        title: "Tailwind CSS Component Library",
        category: "code",
        price: 59.00,
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 6,
        title: "Minimalist Vector Icon Set",
        category: "ui-kits",
        price: 19.00,
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80"
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
        productGrid.innerHTML = `<p>No digital assets found in this category.</p>`;
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
                    <button class="add-to-cart-btn" data-id="${product.id}">+ Add Asset</button>
                </div>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

// --- Event Listeners Setup ---
function setupEventListeners() {
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

    productGrid.addEventListener('click', (e) => {
        if(e.target.classList.contains('add-to-cart-btn')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
        }
    });

    cartBtn.addEventListener('click', toggleCart);
    closeCartBtn.addEventListener('click', toggleCart);
    overlay.addEventListener('click', toggleCart);

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

    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Success! Check your inbox for your first free digital asset bundle.');
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
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalCount;

    if(cart.length === 0) {
        cartItemsContainer.innerHTML = `<p class="empty-cart-msg">Your download queue is empty.</p>`;
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
