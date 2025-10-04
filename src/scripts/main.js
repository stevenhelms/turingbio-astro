// Loading animation
window.addEventListener('load', function() {
    const loadingOverlay = document.getElementById('loading-overlay');
    setTimeout(() => {
        loadingOverlay.classList.add('hidden');
    }, 800);
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Scroll to top button
const scrollToTopBtn = document.getElementById('scroll-to-top');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

scrollToTopBtn.addEventListener('click', scrollToTop);

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

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in-on-scroll').forEach(el => {
    observer.observe(el);
});

// Mobile menu functionality (placeholder for future enhancement)
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
mobileMenuBtn.addEventListener('click', function() {
    // Mobile menu toggle would go here
    console.log('Mobile menu clicked - functionality to be added');
});

// Coming soon modal for incomplete links
function showComingSoon(feature) {
    alert(`${feature} coming soon! We're working hard to bring you this feature.`);
}

// Add some interactivity to metric cards
document.querySelectorAll('.metric-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(-5px) scale(1)';
    });
});

// Add click animation to buttons
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('click', function(e) {
        let ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.left = (e.clientX - e.target.offsetLeft) + 'px';
        ripple.style.top = (e.clientY - e.target.offsetTop) + 'px';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    .btn-primary, .btn-secondary {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// Add some dynamic behavior to progress bars
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const width = bar.style.width || bar.classList.contains('progress-25') ? '25%' : 
                     bar.classList.contains('progress-40') ? '40%' :
                     bar.classList.contains('progress-60') ? '60%' :
                     bar.classList.contains('progress-75') ? '75%' :
                     bar.classList.contains('progress-90') ? '90%' : '0%';
        
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.transition = 'width 1.5s ease-out';
            bar.style.width = width;
        }, 500);
    });
}

// Trigger progress bar animation when pipeline section comes into view
const pipelineObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateProgressBars();
            pipelineObserver.unobserve(entry.target); // Only animate once
        }
    });
}, { threshold: 0.3 });

const pipelineSection = document.getElementById('pipeline');
if (pipelineSection) {
    pipelineObserver.observe(pipelineSection);
}

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close any open modals or menus
        console.log('Escape key pressed');
    }
    
    if (e.key === 'Enter' && e.target.classList.contains('btn-primary', 'btn-secondary')) {
        e.target.click();
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll handler
const debouncedScrollHandler = debounce(function() {
    const header = document.getElementById('header');
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
}, 10);

// Replace the original scroll event listener
window.removeEventListener('scroll', function() {}); // Remove previous listeners
window.addEventListener('scroll', debouncedScrollHandler);

// Analytics placeholder (for future implementation)
function trackEvent(eventName, properties = {}) {
    console.log(`Event: ${eventName}`, properties);
    // Real analytics implementation would go here
}

// Track button clicks
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('click', function() {
        trackEvent('button_click', {
            button_text: this.textContent.trim(),
            button_type: this.classList.contains('btn-primary') ? 'primary' : 'secondary'
        });
    });
});

console.log('Turing Biosciences website loaded successfully!');
