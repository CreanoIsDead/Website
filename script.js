// Select DOM Elements
const openLoginBtn = document.getElementById('openLoginBtn');
const closeLoginBtn = document.getElementById('closeLoginBtn');
const authModal = document.getElementById('authModal');
const loginForm = document.getElementById('loginForm');

// Open Modal when Login button is clicked
openLoginBtn.addEventListener('click', () => {
    authModal.classList.add('active');
});

// Close Modal when 'X' is clicked
closeLoginBtn.addEventListener('click', () => {
    authModal.classList.remove('active');
});

// Close Modal if user clicks outside the modal card box
authModal.addEventListener('click', (e) => {
    if (e.target === authModal) {
        authModal.classList.remove('active');
    }
});

// Handle Login Form Submission (Frontend Mockup)
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const ign = document.getElementById('ignInput').value;
    const phone = document.getElementById('phoneInput').value;

    if(ign && phone) {
        alert(`Welcome, ${ign}! Successfully logged in.`);
        authModal.classList.remove('active');
        
        // Change header button appearance to show logged-in state
        openLoginBtn.innerText = ign;
        openLoginBtn.style.background = "transparent";
        openLoginBtn.style.border = "1px solid var(--accent-color)";
        openLoginBtn.style.color = "var(--accent-color)";
    }
});
