// Modern JavaScript for Vince's Website

class VinceWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeAnimations();
        this.setupTypewriter();
        this.setupTripButton();
        this.setupNavbar();
    }

    setupEventListeners() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Window scroll events
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });

        // Window resize events
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    initializeAnimations() {
        // Initialize AOS (Animate On Scroll)
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true,
                offset: 100
            });
        }

        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
    }

    setupTypewriter() {
        const texts = [
            "CRO aficionado with 10+ years of experience",
            "Expert in SQL, Analytics & AI usage",
            "Delivering impactful solutions across industries",
            "Passionate about continuous improvement"
        ];

        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typedElement = document.getElementById('typed-text');
        
        if (!typedElement) return;

        const typeSpeed = 100;
        const deleteSpeed = 50;
        const pauseTime = 2000;

        const typeWriter = () => {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typedElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typedElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            let speed = isDeleting ? deleteSpeed : typeSpeed;

            if (!isDeleting && charIndex === currentText.length) {
                speed = pauseTime;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                speed = 500;
            }

            setTimeout(typeWriter, speed);
        };

        typeWriter();
    }

    setupTripButton() {
        const tripBtn = document.getElementById('tripBtn');
        const heroBackground = document.querySelector('.hero-background');
        
        if (!tripBtn || !heroBackground) return;

        const images = [
            'jp_island.jpg',
            'me_onthesea.jpg',
            'norway.jpg',
            'stmichel.jpg',
            'telaviv.jpg',
            'trani.jpg',
            'testjp.jpg'
        ];

        let currentImageIndex = 0;

        tripBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            const imagePath = `vince-ieva.github.io/img/${images[currentImageIndex]}`;
            
            heroBackground.style.backgroundImage = `url('${imagePath}')`;
            heroBackground.style.opacity = '0.2';
            
            // Add a subtle animation
            heroBackground.style.transform = 'scale(1.05)';
            setTimeout(() => {
                heroBackground.style.transform = 'scale(1)';
            }, 300);

            // Update button text temporarily
            const originalText = tripBtn.innerHTML;
            tripBtn.innerHTML = '<i class="fas fa-check"></i> Nice Shot!';
            setTimeout(() => {
                tripBtn.innerHTML = originalText;
            }, 1500);
        });
    }

    setupNavbar() {
        const navbar = document.getElementById('mainNav');
        if (!navbar) return;

        const handleNavbarScroll = () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        };

        window.addEventListener('scroll', handleNavbarScroll);
        
        // Set active nav link based on scroll position
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

        const setActiveNavLink = () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        };

        window.addEventListener('scroll', setActiveNavLink);
    }

    handleScroll() {
        // Parallax effect for hero background
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroBackground.style.transform = `translateY(${rate}px)`;
        }

        // Floating cards animation based on scroll
        const floatingCards = document.querySelectorAll('.floating-card');
        floatingCards.forEach((card, index) => {
            const scrolled = window.pageYOffset;
            const rate = (scrolled * 0.1) * (index + 1);
            card.style.transform = `translateY(${rate}px)`;
        });
    }

    handleResize() {
        // Handle responsive adjustments
        const heroSection = document.querySelector('.hero-section');
        if (heroSection && window.innerWidth < 768) {
            // Mobile adjustments
            heroSection.style.minHeight = 'auto';
        } else if (heroSection) {
            heroSection.style.minHeight = '100vh';
        }
    }

    // Utility methods
    static debounce(func, wait) {
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

    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Portfolio filtering (for future enhancement)
    filterPortfolio(category) {
        const items = document.querySelectorAll('.portfolio-item');
        items.forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.5s ease-in-out';
            } else {
                item.style.display = 'none';
            }
        });
    }

    // Contact form handling (for future enhancement)
    handleContactForm(formData) {
        // This would handle contact form submission
        console.log('Contact form data:', formData);
        
        // Show success message
        this.showNotification('Message sent successfully!', 'success');
    }

    // Notification system
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Add styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 1.5rem',
            borderRadius: '0.5rem',
            color: 'white',
            fontWeight: '500',
            zIndex: '9999',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease-in-out'
        });

        // Set background color based on type
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#2563eb'
        };
        notification.style.backgroundColor = colors[type] || colors.info;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Performance monitoring
    measurePerformance() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                const perfData = performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log(`Page load time: ${pageLoadTime}ms`);
            });
        }
    }
}

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const website = new VinceWebsite();
    
    // Add some performance monitoring
    website.measurePerformance();
    
    // Add loading animation removal
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 300);
        }, 1000);
    }
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VinceWebsite;
}
