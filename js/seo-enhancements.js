// SEO Enhancement Script
class SEOEnhancements {
    constructor() {
        this.init();
    }

    init() {
        this.addStructuredData();
        this.optimizeImages();
        this.addBreadcrumbs();
        this.enhanceInternalLinking();
        this.addPageLoadTracking();
        this.optimizeMetaTags();
    }

    addStructuredData() {
        // Add Organization structured data
        const organizationData = {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Vincenzo Ieva - CRO Expert",
            "url": "https://vince-ieva.github.io/",
            "logo": "https://vince-ieva.github.io/img/vincelogov-removebg.png",
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+44-XXX-XXXX",
                "contactType": "customer service",
                "email": "vincenzo_ieva@hotmail.it"
            },
            "sameAs": [
                "https://www.linkedin.com/in/vincenzo-ieva-07b41437/",
                "https://github.com/vince-ieva",
                "https://twitter.com/VincenzoIeva"
            ]
        };

        // Add WebSite structured data
        const websiteData = {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Vincenzo Ieva Portfolio",
            "url": "https://vince-ieva.github.io/",
            "description": "CRO aficionado with 10+ years experience in web analytics, SQL, and AI. Delivering impactful solutions across diverse industries.",
            "author": {
                "@type": "Person",
                "name": "Vincenzo Ieva"
            },
            "potentialAction": {
                "@type": "SearchAction",
                "target": "https://vince-ieva.github.io/?search={search_term_string}",
                "query-input": "required name=search_term_string"
            }
        };

        // Add Professional Service structured data
        const serviceData = {
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "CRO & Web Analytics Consulting",
            "description": "Expert conversion rate optimization and web analytics services",
            "provider": {
                "@type": "Person",
                "name": "Vincenzo Ieva"
            },
            "areaServed": "Worldwide",
            "serviceType": [
                "Conversion Rate Optimization",
                "Web Analytics",
                "Adobe Analytics Implementation",
                "Google Analytics Setup",
                "A/B Testing",
                "Data Analysis"
            ]
        };

        this.injectStructuredData([organizationData, websiteData, serviceData]);
    }

    injectStructuredData(dataArray) {
        dataArray.forEach(data => {
            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.textContent = JSON.stringify(data);
            document.head.appendChild(script);
        });
    }

    optimizeImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            // Add loading="lazy" for performance
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }

            // Ensure alt text exists
            if (!img.hasAttribute('alt') || img.getAttribute('alt') === '') {
                const src = img.getAttribute('src') || '';
                const filename = src.split('/').pop().split('.')[0];
                img.setAttribute('alt', `Image: ${filename}`);
            }

            // Add width and height if missing (helps with CLS)
            if (!img.hasAttribute('width') && !img.hasAttribute('height')) {
                img.onload = function() {
                    this.setAttribute('width', this.naturalWidth);
                    this.setAttribute('height', this.naturalHeight);
                };
            }
        });
    }

    addBreadcrumbs() {
        const currentPage = window.location.pathname;
        let breadcrumbData = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://vince-ieva.github.io/"
                }
            ]
        };

        // Add current page to breadcrumb
        if (currentPage.includes('contact')) {
            breadcrumbData.itemListElement.push({
                "@type": "ListItem",
                "position": 2,
                "name": "Contact",
                "item": "https://vince-ieva.github.io/contact.html"
            });
        } else if (currentPage.includes('resume')) {
            breadcrumbData.itemListElement.push({
                "@type": "ListItem",
                "position": 2,
                "name": "Resume",
                "item": "https://vince-ieva.github.io/resume.html"
            });
        }

        this.injectStructuredData([breadcrumbData]);
    }

    enhanceInternalLinking() {
        // Add rel="noopener" to external links for security
        const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="vince-ieva.github.io"])');
        externalLinks.forEach(link => {
            link.setAttribute('rel', 'noopener noreferrer');
            link.setAttribute('target', '_blank');
        });

        // Add title attributes to internal links for better UX
        const internalLinks = document.querySelectorAll('a[href^="#"], a[href$=".html"]');
        internalLinks.forEach(link => {
            if (!link.hasAttribute('title')) {
                const text = link.textContent.trim();
                if (text) {
                    link.setAttribute('title', `Navigate to ${text}`);
                }
            }
        });
    }

    addPageLoadTracking() {
        // Track page load performance for SEO insights
        window.addEventListener('load', () => {
            if ('performance' in window) {
                const perfData = performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                const domContentLoadedTime = perfData.domContentLoadedEventEnd - perfData.navigationStart;
                
                // Send to Google Analytics if available
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'page_load_time', {
                        'event_category': 'performance',
                        'value': Math.round(pageLoadTime),
                        'custom_parameter': {
                            'dom_content_loaded': Math.round(domContentLoadedTime)
                        }
                    });
                }

                // Log for debugging
                console.log(`Page Load Time: ${pageLoadTime}ms`);
                console.log(`DOM Content Loaded: ${domContentLoadedTime}ms`);
            }
        });
    }

    optimizeMetaTags() {
        // Ensure viewport meta tag is optimized
        let viewportMeta = document.querySelector('meta[name="viewport"]');
        if (viewportMeta) {
            viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1, shrink-to-fit=no');
        }

        // Add language attribute to html tag
        document.documentElement.setAttribute('lang', 'en');

        // Optimize title length (50-60 characters is ideal)
        const title = document.querySelector('title');
        if (title && title.textContent.length > 60) {
            console.warn('Title tag is longer than 60 characters, consider shortening for better SEO');
        }

        // Check meta description length (150-160 characters is ideal)
        const description = document.querySelector('meta[name="description"]');
        if (description) {
            const descLength = description.getAttribute('content').length;
            if (descLength > 160) {
                console.warn('Meta description is longer than 160 characters, consider shortening');
            } else if (descLength < 120) {
                console.warn('Meta description is shorter than 120 characters, consider expanding');
            }
        }
    }

    // Method to dynamically update page title and meta description
    updatePageMeta(title, description) {
        document.title = title;
        
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', description);
        }

        // Update Open Graph tags
        const ogTitle = document.querySelector('meta[property="og:title"]');
        const ogDesc = document.querySelector('meta[property="og:description"]');
        
        if (ogTitle) ogTitle.setAttribute('content', title);
        if (ogDesc) ogDesc.setAttribute('content', description);

        // Update Twitter tags
        const twitterTitle = document.querySelector('meta[property="twitter:title"]');
        const twitterDesc = document.querySelector('meta[property="twitter:description"]');
        
        if (twitterTitle) twitterTitle.setAttribute('content', title);
        if (twitterDesc) twitterDesc.setAttribute('content', description);
    }

    // Method to add FAQ structured data
    addFAQStructuredData(faqs) {
        const faqData = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                }
            }))
        };

        this.injectStructuredData([faqData]);
    }

    // Method to track scroll depth for engagement metrics
    trackScrollDepth() {
        let maxScroll = 0;
        const milestones = [25, 50, 75, 100];
        const tracked = new Set();

        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round(
                (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
            );
            
            maxScroll = Math.max(maxScroll, scrollPercent);

            milestones.forEach(milestone => {
                if (scrollPercent >= milestone && !tracked.has(milestone)) {
                    tracked.add(milestone);
                    
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'scroll_depth', {
                            'event_category': 'engagement',
                            'value': milestone,
                            'event_label': `${milestone}%`
                        });
                    }
                }
            });
        });
    }
}

// Initialize SEO enhancements when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.seoEnhancements = new SEOEnhancements();
    window.seoEnhancements.trackScrollDepth();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SEOEnhancements;
}
