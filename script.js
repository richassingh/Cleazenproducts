// Products data
const products = [
    {
        id: 1,
        name: "Multi-Surface Cleaner",
        price: "₹299",
        image: "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=300&h=300&fit=crop",
        description: "Powerful all-purpose cleaner for home and office"
    },
    {
        id: 2,
        name: "Glass & Mirror Cleaner",
        price: "₹199",
        image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=300&h=300&fit=crop",
        description: "Streak-free shine for all glass surfaces"
    },
    {
        id: 3,
        name: "Floor Disinfectant",
        price: "₹349",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop",
        description: "Kills 99.9% germs while cleaning floors"
    },
    {
        id: 4,
        name: "Kitchen Degreaser",
        price: "₹279",
        image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300&h=300&fit=crop",
        description: "Heavy-duty degreaser for kitchen surfaces"
    },
    {
        id: 5,
        name: "Bathroom Cleaner",
        price: "₹259",
        image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=300&h=300&fit=crop",
        description: "Removes soap scum and hard water stains"
    },
    {
        id: 6,
        name: "Fabric Freshener",
        price: "₹189",
        image: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=300&h=300&fit=crop",
        description: "Eliminates odors and freshens fabrics"
    }
];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load products
    loadProducts();
    
    // Mobile menu toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = '#fff';
            navbar.style.backdropFilter = 'none';
        }
    });
});

// Load products function
function loadProducts() {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Create product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-footer">
                <span class="product-price">${product.price}</span>
                <button class="btn btn-whatsapp" onclick="handleWhatsAppEnquiry('${product.name}')">
                    <i class="fab fa-whatsapp"></i> Enquiry
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// WhatsApp enquiry function
function handleWhatsAppEnquiry(productName) {
    const message = `Hi! I'm interested in ${productName}. Can you please provide more details?`;
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Contact WhatsApp function
function handleContactWhatsApp() {
    const message = "Hi! I'd like to know more about Cleazen products and services.";
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Contact form handler
function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const message = formData.get('message');
    
    // Create WhatsApp message with form data
    const whatsappMessage = `Hi! I'm ${name}. 

Email: ${email}
Phone: ${phone}

Message: ${message}

I'd like to get in touch regarding Cleazen products.`;
    
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Show success message
    showNotification('Thank you! Redirecting to WhatsApp...', 'success');
    
    // Redirect to WhatsApp after a short delay
    setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        e.target.reset(); // Reset form
    }, 1500);
}

// Show notification function
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#2563eb'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.feature-card, .product-card, .service-card, .testimonial-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Lazy loading for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '1';
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        img.onload = () => {
            img.style.opacity = '1';
        };
        imageObserver.observe(img);
    });
});
