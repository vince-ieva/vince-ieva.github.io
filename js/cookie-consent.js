// Cookie Consent Management System
class CookieConsent {
    constructor() {
        this.cookieTypes = {
            necessary: {
                name: 'Necessary',
                description: 'Essential cookies for website functionality',
                required: true,
                cookieName: 'cookies_necessary',
                defaultValue: true
            },
            analytics: {
                name: 'Analytics',
                description: 'Help us understand how visitors interact with our website',
                required: false,
                cookieName: 'cookies_analytics',
                defaultValue: false
            },
            marketing: {
                name: 'Marketing',
                description: 'Used to track visitors and display relevant ads',
                required: false,
                cookieName: 'cookies_marketing',
                defaultValue: false
            },
            preferences: {
                name: 'Preferences',
                description: 'Remember your settings and preferences',
                required: false,
                cookieName: 'cookies_preferences',
                defaultValue: false
            }
        };
        
        this.consentCookieName = 'cookie_consent_status';
        this.consentVersion = '1.0';
        this.init();
    }

    init() {
        this.createBanner();
        this.checkExistingConsent();
        this.setupEventListeners();
    }

    createBanner() {
        const banner = document.createElement('div');
        banner.id = 'cookie-consent-banner';
        banner.className = 'cookie-consent-banner';
        
        banner.innerHTML = `
            <div class="cookie-banner-content">
                <div class="cookie-banner-header">
                    <h3>Cookie Preferences</h3>
                </div>
                
                <div class="cookie-banner-footer">
                    <div class="cookie-banner-actions">
                        <button class="btn btn-outline-secondary" id="cookie-reject-all">
                            Reject All
                        </button>
                        <button class="btn btn-outline-primary" id="cookie-customize">
                            Customize
                        </button>
                        <button class="btn btn-primary" id="cookie-accept-all">
                            Accept All
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="cookie-settings-modal" id="cookie-settings-modal" style="display: none;">
                <div class="cookie-settings-content">
                    <div class="cookie-settings-header">
                        <h3>Cookie Preferences</h3>
                        <button class="cookie-settings-close" id="cookie-settings-close">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <div class="cookie-settings-body">
                        <p>Choose which cookies you want to accept. You can change these settings at any time.</p>
                        
                        <div class="cookie-categories">
                            ${this.generateDetailedCookieHTML()}
                        </div>
                    </div>
                    
                    <div class="cookie-settings-footer">
                        <button class="btn btn-outline-secondary" id="cookie-settings-cancel">
                            Cancel
                        </button>
                        <button class="btn btn-primary" id="cookie-settings-save">
                            Save Preferences
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(banner);
        this.addStyles();
    }

    generateCookieTypeHTML() {
        return Object.entries(this.cookieTypes).map(([key, type]) => `
            <div class="cookie-type-summary">
                <div class="cookie-type-info">
                    <strong>${type.name}</strong>
                    <span class="cookie-count" id="cookie-count-${key}">
                        ${type.required ? 'Always Active' : 'Inactive'}
                    </span>
                </div>
            </div>
        `).join('');
    }

    generateDetailedCookieHTML() {
        return Object.entries(this.cookieTypes).map(([key, type]) => `
            <div class="cookie-category">
                <div class="cookie-category-header">
                    <div class="cookie-category-info">
                        <h4>${type.name}</h4>
                        <p>${type.description}</p>
                    </div>
                    <div class="cookie-toggle">
                        <label class="switch">
                            <input type="checkbox" 
                                   id="cookie-${key}" 
                                   ${type.required ? 'checked disabled' : ''}
                                   data-cookie-type="${key}">
                            <span class="slider"></span>
                        </label>
                    </div>
                </div>
                
                <div class="cookie-details">
                    <div class="cookie-detail-item">
                        <strong>Purpose:</strong> ${this.getCookiePurpose(key)}
                    </div>
                    <div class="cookie-detail-item">
                        <strong>Duration:</strong> ${this.getCookieDuration(key)}
                    </div>
                    <div class="cookie-detail-item">
                        <strong>Provider:</strong> ${this.getCookieProvider(key)}
                    </div>
                </div>
            </div>
        `).join('');
    }

    getCookiePurpose(type) {
        const purposes = {
            necessary: 'Essential for website functionality and security',
            analytics: 'Website performance analysis and user behavior tracking',
            marketing: 'Personalized advertising and marketing campaigns',
            preferences: 'Remember user settings and personalization'
        };
        return purposes[type] || 'General website functionality';
    }

    getCookieDuration(type) {
        const durations = {
            necessary: '1 year',
            analytics: '2 years',
            marketing: '1 year',
            preferences: '1 year'
        };
        return durations[type] || '1 year';
    }

    getCookieProvider(type) {
        const providers = {
            necessary: 'This website',
            analytics: 'Google Analytics',
            marketing: 'Google Ads, Facebook',
            preferences: 'This website'
        };
        return providers[type] || 'This website';
    }

    setupEventListeners() {
        // Accept all cookies
        document.getElementById('cookie-accept-all')?.addEventListener('click', () => {
            this.acceptAllCookies();
        });

        // Reject all cookies
        document.getElementById('cookie-reject-all')?.addEventListener('click', () => {
            this.rejectAllCookies();
        });

        // Customize cookies
        document.getElementById('cookie-customize')?.addEventListener('click', () => {
            this.showCustomizeModal();
        });



        // Settings modal events
        document.getElementById('cookie-settings-close')?.addEventListener('click', () => {
            this.hideCustomizeModal();
        });

        document.getElementById('cookie-settings-cancel')?.addEventListener('click', () => {
            this.hideCustomizeModal();
        });

        document.getElementById('cookie-settings-save')?.addEventListener('click', () => {
            this.saveCustomPreferences();
        });

        // Toggle events for cookie types
        Object.keys(this.cookieTypes).forEach(key => {
            const checkbox = document.getElementById(`cookie-${key}`);
            checkbox?.addEventListener('change', (e) => {
                this.updateCookieCount(key, e.target.checked);
            });
        });
    }

    checkExistingConsent() {
        const consent = this.getCookie(this.consentCookieName);
        if (consent) {
            this.hideBanner();
            this.loadExistingPreferences();
        } else {
            this.showBanner();
        }
    }

    acceptAllCookies() {
        Object.keys(this.cookieTypes).forEach(key => {
            this.setCookie(this.cookieTypes[key].cookieName, 'true', 365);
        });
        
        this.setCookie(this.consentCookieName, JSON.stringify({
            version: this.consentVersion,
            timestamp: new Date().toISOString(),
            preferences: Object.keys(this.cookieTypes).reduce((acc, key) => {
                acc[key] = true;
                return acc;
            }, {})
        }), 365);

        this.hideBanner();
        this.triggerConsentEvent('accept_all');
    }

    rejectAllCookies() {
        Object.keys(this.cookieTypes).forEach(key => {
            if (!this.cookieTypes[key].required) {
                this.setCookie(this.cookieTypes[key].cookieName, 'false', 365);
            } else {
                this.setCookie(this.cookieTypes[key].cookieName, 'true', 365);
            }
        });

        this.setCookie(this.consentCookieName, JSON.stringify({
            version: this.consentVersion,
            timestamp: new Date().toISOString(),
            preferences: Object.keys(this.cookieTypes).reduce((acc, key) => {
                acc[key] = this.cookieTypes[key].required;
                return acc;
            }, {})
        }), 365);

        this.hideBanner();
        this.triggerConsentEvent('reject_all');
    }

    showCustomizeModal() {
        document.getElementById('cookie-settings-modal').style.display = 'flex';
        this.loadCurrentPreferences();
    }

    hideCustomizeModal() {
        document.getElementById('cookie-settings-modal').style.display = 'none';
    }

    saveCustomPreferences() {
        const preferences = {};
        
        Object.keys(this.cookieTypes).forEach(key => {
            const checkbox = document.getElementById(`cookie-${key}`);
            const isAccepted = checkbox ? checkbox.checked : this.cookieTypes[key].required;
            preferences[key] = isAccepted;
            
            this.setCookie(this.cookieTypes[key].cookieName, isAccepted ? 'true' : 'false', 365);
        });

        this.setCookie(this.consentCookieName, JSON.stringify({
            version: this.consentVersion,
            timestamp: new Date().toISOString(),
            preferences: preferences
        }), 365);

        this.hideCustomizeModal();
        this.hideBanner();
        this.triggerConsentEvent('custom', preferences);
    }

    loadCurrentPreferences() {
        Object.keys(this.cookieTypes).forEach(key => {
            const checkbox = document.getElementById(`cookie-${key}`);
            const cookieValue = this.getCookie(this.cookieTypes[key].cookieName);
            
            if (checkbox && !this.cookieTypes[key].required) {
                checkbox.checked = cookieValue === 'true';
            }
            
            this.updateCookieCount(key, cookieValue === 'true');
        });
    }

    loadExistingPreferences() {
        const consent = this.getCookie(this.consentCookieName);
        if (consent) {
            try {
                const consentData = JSON.parse(consent);
                // GTM will handle analytics based on cookie existence
            } catch (e) {
                console.warn('Error parsing consent data:', e);
            }
        }
    }

    updateCookieCount(type, isActive) {
        const countElement = document.getElementById(`cookie-count-${type}`);
        if (countElement && !this.cookieTypes[type].required) {
            countElement.textContent = isActive ? 'Active' : 'Inactive';
            countElement.className = `cookie-count ${isActive ? 'active' : 'inactive'}`;
        }
    }

    showBanner() {
        const banner = document.getElementById('cookie-consent-banner');
        if (banner) {
            banner.classList.add('show');
        }
    }

    hideBanner() {
        const banner = document.getElementById('cookie-consent-banner');
        if (banner) {
            banner.classList.remove('show');
        }
    }



    triggerConsentEvent(action, data = {}) {
        // Custom event for other scripts to listen to
        window.dispatchEvent(new CustomEvent('cookieConsentChange', {
            detail: {
                action: action,
                data: data,
                timestamp: new Date().toISOString()
            }
        }));

        // GTM will handle analytics events based on cookie consent
    }

    // Utility methods
    setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
    }

    getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    hasConsent(type) {
        const cookieValue = this.getCookie(this.cookieTypes[type]?.cookieName);
        return cookieValue === 'true';
    }

    // Public API methods
    static hasConsent(type) {
        return window.cookieConsent?.hasConsent(type) || false;
    }

    static showPreferences() {
        window.cookieConsent?.showCustomizeModal();
    }

    static resetConsent() {
        // Clear all consent cookies
        const types = ['necessary', 'analytics', 'marketing', 'preferences'];
        types.forEach(type => {
            document.cookie = `cookies_${type}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        });
        document.cookie = `cookie_consent_status=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        
        // Reload page to show banner again
        window.location.reload();
    }

    addStyles() {
        const styles = `
            <style>
            .cookie-consent-banner {
                position: fixed;
                bottom: -100%;
                left: 0;
                right: 0;
                background: #fff;
                box-shadow: 0 -4px 20px rgba(0,0,0,0.15);
                z-index: 10000;
                transition: bottom 0.3s ease-in-out;
                border-top: 3px solid #2563eb;
            }

            .cookie-consent-banner.show {
                bottom: 0;
            }

            .cookie-banner-content {
                max-width: 800px;
                margin: 0 auto;
                padding: 15px 20px;
            }

            .cookie-banner-header {
                text-align: center;
                margin-bottom: 15px;
            }

            .cookie-banner-header h3 {
                margin: 0;
                color: #1f2937;
                font-size: 1.1rem;
                font-weight: 600;
            }



            .cookie-banner-footer {
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .cookie-banner-actions {
                display: flex;
                gap: 12px;
                flex-wrap: wrap;
                justify-content: center;
            }



            /* Settings Modal */
            .cookie-settings-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.5);
                z-index: 10001;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
            }

            .cookie-settings-content {
                background: #fff;
                border-radius: 12px;
                max-width: 600px;
                width: 100%;
                max-height: 80vh;
                overflow-y: auto;
                box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);
            }

            .cookie-settings-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px 20px 0;
                border-bottom: 1px solid #e5e7eb;
                margin-bottom: 20px;
            }

            .cookie-settings-header h3 {
                margin: 0;
                color: #1f2937;
            }

            .cookie-settings-close {
                background: none;
                border: none;
                font-size: 1.2rem;
                cursor: pointer;
                color: #6b7280;
                padding: 5px;
            }

            .cookie-settings-body {
                padding: 0 20px;
            }

            .cookie-categories {
                display: flex;
                flex-direction: column;
                gap: 20px;
            }

            .cookie-category {
                border: 1px solid #e5e7eb;
                border-radius: 8px;
                overflow: hidden;
            }

            .cookie-category-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                padding: 16px;
                background: #f9fafb;
            }

            .cookie-category-info h4 {
                margin: 0 0 5px 0;
                color: #1f2937;
            }

            .cookie-category-info p {
                margin: 0;
                color: #6b7280;
                font-size: 0.875rem;
            }

            .cookie-toggle {
                flex-shrink: 0;
            }

            /* Toggle Switch */
            .switch {
                position: relative;
                display: inline-block;
                width: 50px;
                height: 24px;
            }

            .switch input {
                opacity: 0;
                width: 0;
                height: 0;
            }

            .slider {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: #ccc;
                transition: .4s;
                border-radius: 24px;
            }

            .slider:before {
                position: absolute;
                content: "";
                height: 18px;
                width: 18px;
                left: 3px;
                bottom: 3px;
                background-color: white;
                transition: .4s;
                border-radius: 50%;
            }

            input:checked + .slider {
                background-color: #2563eb;
            }

            input:disabled + .slider {
                background-color: #9ca3af;
                cursor: not-allowed;
            }

            input:checked + .slider:before {
                transform: translateX(26px);
            }

            .cookie-details {
                padding: 16px;
                background: #fff;
                border-top: 1px solid #e5e7eb;
            }

            .cookie-detail-item {
                margin-bottom: 8px;
                font-size: 0.875rem;
                color: #4b5563;
            }

            .cookie-detail-item strong {
                color: #1f2937;
            }

            .cookie-settings-footer {
                display: flex;
                justify-content: flex-end;
                gap: 10px;
                padding: 20px;
                border-top: 1px solid #e5e7eb;
                background: #f9fafb;
            }

            /* Button Styles */
            .btn {
                padding: 8px 16px;
                border-radius: 6px;
                border: 1px solid transparent;
                cursor: pointer;
                font-size: 0.875rem;
                font-weight: 500;
                text-decoration: none;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s;
            }

            .btn-primary {
                background-color: #2563eb;
                color: white;
                border-color: #2563eb;
            }

            .btn-primary:hover {
                background-color: #1d4ed8;
                border-color: #1d4ed8;
            }

            .btn-outline-primary {
                background-color: transparent;
                color: #2563eb;
                border-color: #2563eb;
            }

            .btn-outline-primary:hover {
                background-color: #2563eb;
                color: white;
            }

            .btn-outline-secondary {
                background-color: transparent;
                color: #6b7280;
                border-color: #d1d5db;
            }

            .btn-outline-secondary:hover {
                background-color: #f3f4f6;
                color: #374151;
            }

            /* Responsive */
            @media (max-width: 768px) {
                .cookie-banner-footer {
                    flex-direction: column;
                    align-items: stretch;
                }

                .cookie-banner-actions {
                    justify-content: center;
                }

                .cookie-types {
                    grid-template-columns: 1fr;
                }

                .cookie-category-header {
                    flex-direction: column;
                    gap: 15px;
                }

                .cookie-settings-content {
                    margin: 10px;
                    max-height: 90vh;
                }
            }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', styles);
    }
}

// Initialize cookie consent when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.cookieConsent = new CookieConsent();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CookieConsent;
}
