function switchCategory(category) {
    const cards = document.querySelectorAll('.product-card');
    const buttons = document.querySelectorAll('.tab-btn');

    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

function addToOrder(itemName, itemPrice) {
    window.location.href = `mailto:support@example.com?subject=order: ${encodeURIComponent(itemName)}&body=requesting acquisition of ${encodeURIComponent(itemName)} priced at $${itemPrice.toFixed(2)}`;
}
