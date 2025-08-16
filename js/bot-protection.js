// Bot Protection System
class BotProtection {
    constructor() {
        this.isBot = false;
        this.suspiciousActivity = 0;
        this.maxSuspiciousActivity = 5;
        this.init();
    }

    init() {
        this.detectBot();
        this.setupBehaviorMonitoring();
        this.setupRateLimiting();
        this.setupHoneypots();
    }

    detectBot() {
        // Check user agent
        const userAgent = navigator.userAgent.toLowerCase();
        const botPatterns = [
            'bot', 'crawler', 'spider', 'scraper', 'headless',
            'phantom', 'selenium', 'puppeteer', 'playwright',
            'curl', 'wget', 'python-requests', 'axios',
            'ahrefsbot', 'mj12bot', 'dotbot', 'semrushbot',
            'blexbot', 'baiduspider', 'yandexbot'
        ];

        const isUserAgentBot = botPatterns.some(pattern => 
            userAgent.includes(pattern)
        );

        // Check for missing features that real browsers have
        const hasWebGL = !!window.WebGLRenderingContext;
        const hasCanvas = !!window.CanvasRenderingContext2D;
        const hasLocalStorage = !!window.localStorage;
        const hasSessionStorage = !!window.sessionStorage;
        const hasIndexedDB = !!window.indexedDB;

        // Check for automation tools
        const hasWebDriver = navigator.webdriver;
        const hasPhantom = window.callPhantom || window._phantom;
        const hasSelenium = window.selenium || window.__selenium_unwrapped;

        // Check screen properties
        const hasValidScreen = screen.width > 0 && screen.height > 0;
        const hasValidColorDepth = screen.colorDepth > 0;

        // Check for headless indicators
        const isHeadless = window.outerHeight === 0 || 
                          window.outerWidth === 0 ||
                          !window.chrome ||
                          navigator.plugins.length === 0;

        // Mouse and touch capability
        const hasMouseEvents = 'onmousedown' in document;
        const hasTouchEvents = 'ontouchstart' in document;

        // Calculate bot score
        let botScore = 0;
        if (isUserAgentBot) botScore += 3;
        if (!hasWebGL) botScore += 1;
        if (!hasCanvas) botScore += 1;
        if (!hasLocalStorage) botScore += 1;
        if (!hasSessionStorage) botScore += 1;
        if (!hasIndexedDB) botScore += 1;
        if (hasWebDriver) botScore += 3;
        if (hasPhantom) botScore += 3;
        if (hasSelenium) botScore += 3;
        if (!hasValidScreen) botScore += 2;
        if (!hasValidColorDepth) botScore += 1;
        if (isHeadless) botScore += 2;
        if (!hasMouseEvents) botScore += 1;
        if (!hasTouchEvents && !hasMouseEvents) botScore += 1;

        this.isBot = botScore >= 4;

        if (this.isBot) {
            this.handleBotDetection();
        }

        return this.isBot;
    }

    setupBehaviorMonitoring() {
        let mouseMovements = 0;
        let clicks = 0;
        let scrolls = 0;
        let keystrokes = 0;

        // Monitor mouse movements
        document.addEventListener('mousemove', () => {
            mouseMovements++;
        });

        // Monitor clicks
        document.addEventListener('click', () => {
            clicks++;
        });

        // Monitor scrolling
        window.addEventListener('scroll', () => {
            scrolls++;
        });

        // Monitor keystrokes
        document.addEventListener('keydown', () => {
            keystrokes++;
        });

        // Check behavior after 10 seconds
        setTimeout(() => {
            const totalInteractions = mouseMovements + clicks + scrolls + keystrokes;
            
            // If no human-like interactions detected
            if (totalInteractions === 0) {
                this.suspiciousActivity += 2;
            }

            // If only programmatic interactions (no mouse movement but clicks)
            if (mouseMovements === 0 && clicks > 0) {
                this.suspiciousActivity += 1;
            }

            // If too many rapid interactions
            if (totalInteractions > 100) {
                this.suspiciousActivity += 1;
            }

            this.checkSuspiciousActivity();
        }, 10000);
    }

    setupRateLimiting() {
        const requests = [];
        const maxRequests = 10;
        const timeWindow = 60000; // 1 minute

        // Override fetch to monitor requests
        const originalFetch = window.fetch;
        window.fetch = (...args) => {
            const url = args[0];
            
            // Whitelist Google Analytics and GTM domains
            const analyticsWhitelist = [
                'analytics.google.com',
                'region1.analytics.google.com',
                'www.google-analytics.com',
                'www.googletagmanager.com',
                'googletagmanager.com',
                'google-analytics.com',
                'doubleclick.net',
                'googleadservices.com'
            ];
            
            // Check if this is an analytics request
            const isAnalyticsRequest = analyticsWhitelist.some(domain => 
                typeof url === 'string' && url.includes(domain)
            );
            
            // Skip rate limiting for analytics requests - let GTM control everything
            if (isAnalyticsRequest) {
                return originalFetch.apply(this, args);
            }

            const now = Date.now();
            requests.push(now);

            // Remove old requests outside time window
            while (requests.length > 0 && requests[0] < now - timeWindow) {
                requests.shift();
            }

            // Check if rate limit exceeded
            if (requests.length > maxRequests) {
                this.suspiciousActivity += 2;
                this.checkSuspiciousActivity();
                
                // Return a rejected promise with proper error handling
                const rejectedPromise = Promise.reject(new Error('Rate limit exceeded'));
                
                // Add a catch handler to prevent uncaught promise rejection
                rejectedPromise.catch(error => {
                    console.warn('Rate limit exceeded:', error.message);
                    // Optionally send to analytics
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'rate_limit_exceeded', {
                            'event_category': 'security',
                            'event_label': 'fetch_rate_limit'
                        });
                    }
                });
                
                return rejectedPromise;
            }

            return originalFetch.apply(this, args);
        };
    }

    setupHoneypots() {
        // Create invisible honeypot elements
        const honeypot = document.createElement('div');
        honeypot.style.cssText = `
            position: absolute;
            left: -9999px;
            top: -9999px;
            width: 1px;
            height: 1px;
            opacity: 0;
            pointer-events: none;
        `;
        honeypot.innerHTML = `
            <a href="/admin" id="honeypot-link">Admin</a>
            <input type="text" name="honeypot-field" id="honeypot-field">
        `;
        document.body.appendChild(honeypot);

        // Monitor honeypot interactions
        document.getElementById('honeypot-link')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.suspiciousActivity += 3;
            this.checkSuspiciousActivity();
        });

        document.getElementById('honeypot-field')?.addEventListener('input', () => {
            this.suspiciousActivity += 3;
            this.checkSuspiciousActivity();
        });
    }

    checkSuspiciousActivity() {
        if (this.suspiciousActivity >= this.maxSuspiciousActivity) {
            this.handleBotDetection();
        }
    }

    handleBotDetection() {
        console.warn('Bot detected - implementing protection measures');
        
        // Log bot detection (you can send this to your analytics)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'bot_detected', {
                'event_category': 'security',
                'event_label': navigator.userAgent,
                'value': this.suspiciousActivity
            });
        }

        // Implement protection measures
        this.implementProtection();
    }

    implementProtection() {
        // Slow down the bot
        const delay = Math.random() * 3000 + 2000; // 2-5 second delay
        
        // Add artificial delays to interactions
        const originalAddEventListener = EventTarget.prototype.addEventListener;
        EventTarget.prototype.addEventListener = function(type, listener, options) {
            const delayedListener = function(event) {
                setTimeout(() => listener.call(this, event), delay);
            };
            return originalAddEventListener.call(this, type, delayedListener, options);
        };

        // Reduce content visibility
        document.body.style.opacity = '0.3';
        
        // Add loading overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.8);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: Arial, sans-serif;
        `;
        overlay.innerHTML = `
            <div style="text-align: center;">
                <div style="border: 4px solid #f3f3f3; border-top: 4px solid #3498db; border-radius: 50%; width: 50px; height: 50px; animation: spin 2s linear infinite; margin: 0 auto 20px;"></div>
                <p>Verifying your browser...</p>
            </div>
            <style>
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            </style>
        `;
        document.body.appendChild(overlay);

        // Remove overlay after delay (or keep it for bots)
        setTimeout(() => {
            if (!this.isBot) {
                overlay.remove();
                document.body.style.opacity = '1';
            }
        }, delay);
    }

    // Challenge-response system
    createChallenge() {
        return new Promise((resolve) => {
            const challenge = document.createElement('div');
            challenge.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.3);
                z-index: 10000;
                text-align: center;
                font-family: Arial, sans-serif;
            `;

            const num1 = Math.floor(Math.random() * 10) + 1;
            const num2 = Math.floor(Math.random() * 10) + 1;
            const answer = num1 + num2;

            challenge.innerHTML = `
                <h3>Security Check</h3>
                <p>Please solve this simple math problem:</p>
                <p><strong>${num1} + ${num2} = ?</strong></p>
                <input type="number" id="challenge-answer" style="padding: 10px; margin: 10px; border: 1px solid #ccc; border-radius: 5px;">
                <br>
                <button id="challenge-submit" style="padding: 10px 20px; background: #007cba; color: white; border: none; border-radius: 5px; cursor: pointer;">Submit</button>
            `;

            document.body.appendChild(challenge);

            document.getElementById('challenge-submit').addEventListener('click', () => {
                const userAnswer = parseInt(document.getElementById('challenge-answer').value);
                if (userAnswer === answer) {
                    challenge.remove();
                    resolve(true);
                } else {
                    document.getElementById('challenge-answer').style.borderColor = 'red';
                    setTimeout(() => {
                        document.getElementById('challenge-answer').style.borderColor = '#ccc';
                    }, 2000);
                }
            });
        });
    }

    // Public method to check if current visitor is a bot
    static isBot() {
        return window.botProtection?.isBot || false;
    }

    // Public method to get suspicious activity score
    static getSuspiciousScore() {
        return window.botProtection?.suspiciousActivity || 0;
    }


}

// Add global unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
    console.warn('Unhandled promise rejection:', event.reason);
    
    // Prevent the default browser behavior (console error)
    event.preventDefault();
    
    // Optionally send to analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'unhandled_promise_rejection', {
            'event_category': 'javascript_error',
            'event_label': event.reason?.message || 'Unknown error'
        });
    }
});

// Initialize bot protection when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.botProtection = new BotProtection();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BotProtection;
}
