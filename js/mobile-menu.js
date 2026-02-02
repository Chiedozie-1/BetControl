// Mobile Menu Toggle Script for BetControl

document.addEventListener('DOMContentLoaded', function() {
    
    // Create hamburger icon spans if they don't exist
    const navbarToggle = document.querySelector('.navbar-toggle');
    
    if (navbarToggle && navbarToggle.children.length === 0) {
        // Add three spans for hamburger icon
        for (let i = 0; i < 3; i++) {
            const span = document.createElement('span');
            navbarToggle.appendChild(span);
        }
    }
    
    // Create menu overlay
    let menuOverlay = document.querySelector('.menu-overlay');
    if (!menuOverlay) {
        menuOverlay = document.createElement('div');
        menuOverlay.className = 'menu-overlay';
        document.body.appendChild(menuOverlay);
    }
    
    // Get elements
    const mainMenu = document.querySelector('.main-menu');
    const body = document.body;
    
    // Toggle menu function
    function toggleMenu() {
        navbarToggle.classList.toggle('active');
        mainMenu.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        body.style.overflow = mainMenu.classList.contains('active') ? 'hidden' : '';
    }
    
    // Close menu function
    function closeMenu() {
        navbarToggle.classList.remove('active');
        mainMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        body.style.overflow = '';
    }
    
    // Toggle button click
    if (navbarToggle) {
        navbarToggle.addEventListener('click', toggleMenu);
    }
    
    // Overlay click
    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMenu);
    }
    
    // Submenu toggle
    const submenuItems = document.querySelectorAll('.nav-item.submenu');
    submenuItems.forEach(function(item) {
        const link = item.querySelector('.nav-link');
        
        if (link) {
            link.addEventListener('click', function(e) {
                // Only prevent default on mobile
                if (window.innerWidth <= 991) {
                    e.preventDefault();
                    item.classList.toggle('active');
                }
            });
        }
    });
    
    // Close menu on window resize if screen becomes large
    window.addEventListener('resize', function() {
        if (window.innerWidth > 991) {
            closeMenu();
        }
    });
    
    // Close menu when clicking on non-submenu nav links
    const navLinks = document.querySelectorAll('.nav-item:not(.submenu) .nav-link');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 991) {
                closeMenu();
            }
        });
    });
    
    // Close menu when clicking submenu links
    const submenuLinks = document.querySelectorAll('.nav-item.submenu ul .nav-link');
    submenuLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 991) {
                closeMenu();
            }
        });
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Navbar shadow on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.main-header');
    if (header) {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 15px rgba(0,0,0,0.15)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    }
});