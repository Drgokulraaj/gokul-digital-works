// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.padding = '0.5rem 0';
        navbar.style.boxShadow = '0 5px 30px rgba(0,0,0,0.15)';
    } else {
        navbar.style.padding = '1rem 0';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    }

    lastScroll = currentScroll;
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe all service cards, price cards, and info cards
document.querySelectorAll('.service-card, .price-card, .info-card, .table-card').forEach(el => {
    observer.observe(el);
});

// Form Submission Handler
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;

    // Create WhatsApp message
    const whatsappMessage = `Hello! I'm interested in your services.%0A%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AService: ${encodeURIComponent(service)}%0AMessage: ${encodeURIComponent(message)}`;

    // Open WhatsApp
    const whatsappURL = `https://wa.me/919443183440?text=${whatsappMessage}`;
    window.open(whatsappURL, '_blank');

    // Show success message
    alert('Thank you for your inquiry! We will contact you soon.');

    // Reset form
    contactForm.reset();
});

// Add hover effect to price cards
document.querySelectorAll('.price-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.05)';
    });

    card.addEventListener('mouseleave', function() {
        if (!this.classList.contains('featured')) {
            this.style.transform = 'translateY(0) scale(1)';
        } else {
            this.style.transform = 'translateY(0) scale(1.05)';
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroOverlay = document.querySelector('.hero-overlay');
    if (heroOverlay) {
        heroOverlay.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add animation to floating cards
const floatingCards = document.querySelectorAll('.floating-card');
floatingCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.5}s`;
});

// Phone number click to call
document.querySelectorAll('a[href^="tel:"]').forEach(tel => {
    tel.addEventListener('click', (e) => {
        if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            e.preventDefault();
            alert('Phone: ' + tel.textContent);
        }
    });
});

// Copy GPay number on click
const gpayNumber = document.querySelector('.gpay-number');
if (gpayNumber) {
    gpayNumber.style.cursor = 'pointer';
    gpayNumber.title = 'Click to copy';

    gpayNumber.addEventListener('click', () => {
        const number = gpayNumber.textContent;

        // Modern clipboard API
        if (navigator.clipboard) {
            navigator.clipboard.writeText(number).then(() => {
                showCopyNotification('GPay number copied!');
            });
        } else {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = number;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            showCopyNotification('GPay number copied!');
        }
    });
}

// Show copy notification
function showCopyNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: linear-gradient(135deg, #06D6A0, #06FFA5);
        color: white;
        padding: 1rem 2rem;
        border-radius: 50px;
        box-shadow: 0 5px 20px rgba(6, 214, 160, 0.4);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        font-weight: 600;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// Add slide animations to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
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
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Easter egg: Confetti on logo click
let clickCount = 0;
const navBrand = document.querySelector('.nav-brand h1');

navBrand.addEventListener('click', () => {
    clickCount++;
    if (clickCount >= 5) {
        createConfetti();
        clickCount = 0;
    }
});

function createConfetti() {
    const colors = ['#FF6B35', '#F77F00', '#06D6A0', '#9D4EDD', '#FFD60A'];
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            top: -10px;
            left: ${Math.random() * 100}%;
            opacity: 1;
            z-index: 10000;
            border-radius: 50%;
        `;
        document.body.appendChild(confetti);

        const fallDuration = 2000 + Math.random() * 1000;
        const fallDistance = window.innerHeight + 20;
        const drift = (Math.random() - 0.5) * 200;

        confetti.animate([
            { transform: 'translateY(0) translateX(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${fallDistance}px) translateX(${drift}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: fallDuration,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });

        setTimeout(() => {
            document.body.removeChild(confetti);
        }, fallDuration);
    }
}

console.log('%c🖨️ Gokul Digital Works', 'font-size: 24px; font-weight: bold; color: #FF6B35;');
console.log('%cProfessional Printing Services in Puducherry', 'font-size: 14px; color: #666;');
console.log('%cWebsite developed with ❤️', 'font-size: 12px; color: #06D6A0;');