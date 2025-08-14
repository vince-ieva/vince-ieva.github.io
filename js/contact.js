// Contact Page JavaScript

class ContactPage {
    constructor() {
        this.init();
    }

    init() {
        this.setupContactForm();
        this.setupAnimations();
    }

    setupContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission(form);
        });

        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearValidation(input));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let message = '';

        // Remove existing validation classes
        field.classList.remove('is-valid', 'is-invalid');

        switch (field.type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value) {
                    isValid = false;
                    message = 'Email is required';
                } else if (!emailRegex.test(value)) {
                    isValid = false;
                    message = 'Please enter a valid email address';
                }
                break;
            
            case 'text':
                if (!value) {
                    isValid = false;
                    message = `${field.name.charAt(0).toUpperCase() + field.name.slice(1)} is required`;
                } else if (value.length < 2) {
                    isValid = false;
                    message = `${field.name.charAt(0).toUpperCase() + field.name.slice(1)} must be at least 2 characters`;
                }
                break;
            
            default:
                if (field.tagName.toLowerCase() === 'textarea') {
                    if (!value) {
                        isValid = false;
                        message = 'Message is required';
                    } else if (value.length < 10) {
                        isValid = false;
                        message = 'Message must be at least 10 characters';
                    }
                }
        }

        // Apply validation styling
        if (isValid) {
            field.classList.add('is-valid');
            this.removeFieldError(field);
        } else {
            field.classList.add('is-invalid');
            this.showFieldError(field, message);
        }

        return isValid;
    }

    clearValidation(field) {
        field.classList.remove('is-valid', 'is-invalid');
        this.removeFieldError(field);
    }

    showFieldError(field, message) {
        this.removeFieldError(field);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback';
        errorDiv.textContent = message;
        
        field.parentNode.appendChild(errorDiv);
    }

    removeFieldError(field) {
        const existingError = field.parentNode.querySelector('.invalid-feedback');
        if (existingError) {
            existingError.remove();
        }
    }

    async handleFormSubmission(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        
        // Validate all fields
        const inputs = form.querySelectorAll('input, textarea');
        let isFormValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            this.showNotification('Please fix the errors above', 'error');
            return;
        }

        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        try {
            // Collect form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // Simulate form submission (replace with actual endpoint)
            await this.submitForm(data);

            // Show success message
            this.showSuccessMessage();
            form.reset();
            
            // Clear validation classes
            inputs.forEach(input => {
                input.classList.remove('is-valid', 'is-invalid');
                this.removeFieldError(input);
            });

        } catch (error) {
            console.error('Form submission error:', error);
            this.showNotification('There was an error sending your message. Please try again.', 'error');
        } finally {
            // Reset button state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    }

    async submitForm(data) {
        // Simulate API call - replace with actual form submission logic
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // For demo purposes, we'll always resolve
                // In a real implementation, you'd send this to your backend
                console.log('Form data:', data);
                
                // Create mailto link as fallback
                const subject = encodeURIComponent(data.subject);
                const body = encodeURIComponent(
                    `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`
                );
                const mailtoLink = `mailto:vincenzo_ieva@hotmail.it?subject=${subject}&body=${body}`;
                
                // Open email client
                window.location.href = mailtoLink;
                
                resolve();
            }, 2000);
        });
    }

    showSuccessMessage() {
        const form = document.getElementById('contactForm');
        let successMessage = document.querySelector('.success-message');
        
        if (!successMessage) {
            successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            form.parentNode.insertBefore(successMessage, form);
        }
        
        successMessage.innerHTML = `
            <i class="fas fa-check-circle me-2"></i>
            Thank you for your message! I'll get back to you soon.
        `;
        successMessage.classList.add('show');
        
        // Hide after 5 seconds
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'info-circle'} me-2"></i>
            ${message}
        `;
        
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
            transition: 'transform 0.3s ease-in-out',
            maxWidth: '400px'
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

        // Remove after 4 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }

    setupAnimations() {
        // Initialize AOS for contact page
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true,
                offset: 100
            });
        }

        // Add hover effects to contact cards
        const contactCards = document.querySelectorAll('.contact-card');
        contactCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Add click animation to buttons
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                // Create ripple effect
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // Add CSS for ripple animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize contact page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContactPage();
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContactPage;
}
