// Mobile Hamburger Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Global User Coin State
let userCoins = 50;

function updateCoinUI() {
    document.getElementById('user-coins').innerText = userCoins;
    document.getElementById('vault-coins').innerText = userCoins;
}

// Category Tab Switcher Logic
function switchCategory(category) {
    const digitalSec = document.getElementById('digital-section');
    const gadgetsSec = document.getElementById('gadgets-section');
    const buttons = document.querySelectorAll('.tab-btn');

    buttons.forEach(btn => btn.classList.remove('active'));

    if (category === 'digital') {
        digitalSec.style.display = 'grid';
        gadgetsSec.style.display = 'none';
        event.target.classList.add('active');
    } else if (category === 'gadgets') {
        digitalSec.style.display = 'none';
        gadgetsSec.style.display = 'grid';
        event.target.classList.add('active');
    }
}

// Simulated Ad Watcher for "Creano" Coins
function watchAdForCoins() {
    alert("Simulating Ad View... Please wait 3 seconds.");
    setTimeout(() => {
        userCoins += 25;
        updateCoinUI();
        alert("Success! You watched the ad and earned +25 Creano Coins.");
    }, 1500);
}

// Checkout and Coin Discount Logic
function buyItem(itemName, basePrice) {
    let discountApplied = false;
    
    // Check if user has enough coins to get a discount (e.g., costs 30 coins for a 10% discount)
    if (userCoins >= 30) {
        let useCoins = confirm(`You have ${userCoins} Creano Coins. Would you like to spend 30 Creano Coins to get a 10% discount on ${itemName}?`);
        if (useCoins) {
            userCoins -= 30;
            basePrice = basePrice * 0.90; // Apply 10% off
            discountApplied = true;
            updateCoinUI();
        }
    }

    let finalPrice = basePrice.toFixed(2);
    let msg = discountApplied 
        ? `Discount applied successfully! Your final price for ${itemName} is $${finalPrice}. Proceeding to checkout email...`
        : `Proceeding to checkout for ${itemName} at standard price: $${finalPrice}...`;
    
    alert(msg);
    window.location.href = `mailto:support@example.com?subject=Order%20-${encodeURIComponent(itemName)}&body=I%20want%20to%20buy%20this%20item%20for%20$%${finalPrice}`;
}

// Initialize UI state on load
updateCoinUI();
