document.addEventListener('DOMContentLoaded', () => {
    
    // --- LOGIN LOGIC (index.html) ---
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = loginForm.querySelector('input[type="email"]').value;
            const password = loginForm.querySelector('input[type="password"]').value;

            // Simple mock validation
            if (email && password) {
                // Add loading effect
                const btn = loginForm.querySelector('.btn-primary');
                const originalText = btn.innerText;
                btn.innerText = 'Iniciando...';
                btn.style.opacity = '0.7';
                
                setTimeout(() => {
                    // Redirect to dashboard
                    window.location.href = 'dashboard.html';
                }, 1000);
            } else {
                alert('Por favor ingrese credenciales válidas');
            }
        });
    }

    // --- DASHBOARD LOGIC (dashboard.html) ---
    
    // Check if we are on the dashboard page
    if (document.querySelector('.dashboard-body')) {
        // Initialize default section
        showSection('home');
    }
});

// Function to switch sections
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('main > section');
    sections.forEach(sec => {
        sec.classList.add('hidden');
        sec.classList.remove('active-section'); // Custom class for animations if needed
    });

    // Show target section
    const target = document.getElementById(sectionId);
    if (target) {
        target.classList.remove('hidden');
        // Add a small fade-in animation class if you want
        target.style.animation = 'fadeIn 0.5s ease forwards';
    }

    // Update Navbar Active State
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        // Check if the onclick attribute matches the sectionId
        if (link.getAttribute('onclick').includes(sectionId)) {
            link.classList.add('active');
        }
    });
}

// Logout function
function logout() {
    if(confirm('¿Estás seguro que deseas cerrar sesión?')) {
        window.location.href = 'index.html';
    }
}

// Add keyframes for fade in dynamically
const styleSheet = document.createElement("style");
styleSheet.innerText = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(styleSheet);
