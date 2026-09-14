// ADD NEW ITEMS HERE EASILY
const products = [
    {
        id: "01",
        name: "terminal keyboard",
        price: "$145.00",
        category: "hardware",
        url: "https://your-affiliate-link-here.com/keyboard"
    },
    {
        id: "02",
        name: "monochrome display",
        price: "$320.00",
        category: "hardware",
        url: "https://your-affiliate-link-here.com/display"
    },
    {
        id: "03",
        name: "compiler license",
        price: "$80.00",
        category: "software",
        url: "https://your-affiliate-link-here.com/compiler"
    },
    {
        id: "04",
        name: "text editor plugin",
        price: "$25.00",
        category: "software",
        url: "https://your-affiliate-link-here.com/plugin"
    }
];

function renderProducts(filterCategory = 'all') {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';

    const filtered = filterCategory === 'all' 
        ? products 
        : products.filter(p => p.category === filterCategory);

    filtered.forEach(p => {
        const card = document.createElement('article');
        card.className = 'product-card';
        card.setAttribute('data-category', p.category);

        card.innerHTML = `
            <span class="item-id">${p.id}</span>
            <div class="item-details">
                <h3>${p.name}</h3>
                <p class="price">${p.price}</p>
            </div>
            <a href="${p.url}" target="_blank" rel="noopener noreferrer" class="action-btn">view</a>
        `;
        grid.appendChild(card);
    });
}

function switchCategory(category, event) {
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    renderProducts(category);
}

// Initial load
renderProducts('all');
