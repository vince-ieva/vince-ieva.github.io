// Resume Page JavaScript

class ResumePage {
    constructor() {
        this.skillsData = {
            "Conversion Rate Optimization": [
                { name: "A/B Testing", skill: 5 },
                { name: "Optimize", skill: 4 },
                { name: "VWO", skill: 4 },
                { name: "Target", skill: 4 },
                { name: "Monetate", skill: 2 }
            ],
            "Analytics": [
                { name: "Adobe Analytics", skill: 5 },
                { name: "Google Analytics", skill: 5 },
                { name: "AEP", skill: 4 },
                { name: "CJA", skill: 4 },
                { name: "BigQuery", skill: 4 },
                { name: "Python", skill: 3 }
            ],
            "Web & App Tracking": [
                { name: "GTM", skill: 5 },
                { name: "DTM", skill: 5 },
                { name: "Tealium", skill: 4 },
                { name: "App Analytics", skill: 4 },
                { name: "Event Tracking", skill: 5 }
            ],
            "AI & Automation": [
                { name: "AI Usage", skill: 4 },
                { name: "Machine Learning", skill: 3 },
                { name: "Process Automation", skill: 4 },
                { name: "Data Science", skill: 3 }
            ],
            "Dashboarding & Visualization": [
                { name: "Tableau", skill: 4 },
                { name: "DOMO", skill: 4 },
                { name: "Data Studio", skill: 4 }
            ],
            "Technical Skills": [
                { name: "JavaScript", skill: 3 },
                { name: "HTML", skill: 4 },
                { name: "CSS", skill: 3 },
                { name: "jQuery", skill: 2 }
            ]
        };

        this.experienceData = [
            {
                company: "Cognizant Netcentric",
                location: "London",
                date: { start: "Apr 2025", end: "Current" },
                role: "Solution Consultant",
                logo: "vince-ieva.github.io/img/logos/cognizant_netcentric.jpeg",
                tasks: [
                    "Providing strategic consulting solutions for enterprise clients",
                    "Leading digital transformation initiatives",
                    "Architecting scalable analytics and CRO solutions"
                ]
            },
            {
                company: "Mondly (Pearson)",
                location: "Remote Spain",
                date: { start: "Mar 2024", end: "Mar 2025" },
                role: "CRO & Web Analytics Manager",
                logo: "vince-ieva.github.io/img/logos/mondly.jpg",
                tasks: [
                    "Responsible for web CRO activities and analytics tracking",
                    "Implemented a data layer to facilitate user tracking",
                    "Ran over 20 tests in first 3 months: A/B tests, pop-up optimization, reviews prompting",
                    "Used BigQuery to analyze raw data and extrapolate insights",
                    "Set up process to ensure CRO campaigns delivery from ideation to deployment",
                    "Mobile App tracking optimization for activities"
                ]
            },
            {
                company: "Threepipe",
                location: "London",
                date: { start: "Feb 2022", end: "Oct 2023" },
                role: "Head of CRO & Martech",
                logo: "vince-ieva.github.io/img/logos/threepipereply_logo.jpeg",
                tasks: [
                    "Empowered team of six analysts and data engineers delivering exceptional internal support",
                    "Spearheaded Martech projects from implementation to centralized reporting",
                    "Orchestrated productization and launch of CRO projects, securing two new clients within 6 months",
                    "Catalyzed 10% surge in 'Book a table' conversions and 300% increase in newsletter signups for Hawksmoor",
                    "For Easyjet Holidays: delivered seven successful CRO initiatives yielding 2% uplift in transactions, 3% uplift in revenue, projected annual revenue growth of £114 million",
                    "Steered CRO and web analytics sales, spearheading revenue growth and client satisfaction",
                    "Used BigQuery for GA4 analysis to help investigation of clients' analytics"
                ]
            },
            {
                company: "ZFX",
                location: "London",
                date: { start: "Jul 2021", end: "Feb 2022" },
                role: "Martech Lead (Contractor)",
                logo: "vince-ieva.github.io/img/logos/zfx.png",
                tasks: [
                    "Masterminded team of analysts to seamlessly deliver daily business analysis and dashboards",
                    "Led strategic integration of Martech across mobile and web platforms",
                    "Used SQL to ETL for dashboards, crafting and presenting data insights",
                    "Rigorously implemented best practice tracking methodologies ensuring data accuracy"
                ]
            },
            {
                company: "ForwardPMX",
                location: "London",
                date: { start: "Nov 2019", end: "Jun 2021" },
                role: "Martech Manager",
                logo: "vince-ieva.github.io/img/logos/forwardpmx-logo.jpg",
                tasks: [
                    "Led team of analysts, driving execution of analytics projects and delivering exceptional CRO outcomes",
                    "Championed CRO productization, marketing, and delivery across diverse range of projects",
                    "Orchestrated Lightbox campaign using Optimize: 15% increase in revenue, 13% uplift in conversions, 40% surge in website engagement",
                    "Devised campaign for Blue using VWO, successfully redirecting 35% of website traffic to product pages",
                    "Effectively managed web analytics workload for team, ensuring seamless data analysis and reporting"
                ]
            },
            {
                company: "ForwardPMX",
                location: "London",
                date: { start: "Nov 2018", end: "Nov 2019" },
                role: "Senior Web Analyst",
                logo: "vince-ieva.github.io/img/logos/forwardpmx-logo.jpg",
                tasks: [
                    "Nurtured team of web analysts, empowering them to excel in web analytics projects through mentoring",
                    "CRO conceptualization, implementation, and analysis using Optimize to drive business growth",
                    "Meticulously planned and executed tag migration strategies to ensure seamless project delivery",
                    "Leveraged Python and Appscript to automate tasks, reducing manual work by 20%"
                ]
            },
            {
                company: "DMPG",
                location: "London",
                date: { start: "Jun 2017", end: "Nov 2018" },
                role: "Senior Web Analyst",
                logo: "vince-ieva.github.io/img/logos/dmpg-logo.jpg",
                tasks: [
                    "Masterfully utilized Adobe Analytics tools to generate insightful reports across 5 clients",
                    "Expertly crafted CRO reports for clients, identifying wins to maximize conversion rates",
                    "Leveraged Dynamic Tag Manager and Tealium to ensure data integrity for clients",
                    "Produced comprehensive CRO reports using Adobe Analytics 4 Target across multiple clients"
                ]
            },
            {
                company: "The Telegraph Media Group",
                location: "London",
                date: { start: "May 2015", end: "May 2017" },
                role: "Web Analyst",
                logo: "vince-ieva.github.io/img/logos/tmg.png",
                tasks: [
                    "Leveraged Adobe Analytics tools empowering data-driven decision-making for all teams",
                    "Built dashboards by integrating BigQuery and Tableau for performance team",
                    "Boosted team's speed of decisions by 30% through effective dashboard implementation"
                ]
            },
            {
                company: "Starcom Mediavest",
                location: "London",
                date: { start: "Oct 2014", end: "Apr 2015" },
                role: "Junior Web Analyst (Internship)",
                logo: "vince-ieva.github.io/img/logos/svm.jpg",
                tasks: [
                    "Gained foundational experience in web analytics and digital marketing",
                    "Supported senior analysts with data collection and basic reporting",
                    "Learned industry best practices in analytics implementation"
                ]
            },
            {
                company: "Galderma",
                location: "Milan",
                date: { start: "Sep 2013", end: "Aug 2014" },
                role: "Marketing Assistant",
                logo: "vince-ieva.github.io/img/logos/galderma.jpg",
                tasks: [
                    "Built reports and analysis on demand using Excel",
                    "Implemented 2 app projects for division's sales force",
                    "Designed marketing projects aiming to increase product awareness",
                    "Analyzed and monitored the market"
                ]
            }
        ];

        this.init();
    }

    init() {
        this.renderSkills();
        this.renderExperience();
        this.setupAnimations();
        this.setupModal();
    }

    renderSkills() {
        const skillsGrid = document.getElementById('skillsGrid');
        if (!skillsGrid) return;

        let skillsHTML = '';

        Object.keys(this.skillsData).forEach((category, index) => {
            const skills = this.skillsData[category];
            
            skillsHTML += `
                <div class="skill-category" data-aos="fade-up" data-aos-delay="${index * 100}">
                    <h3>${category}</h3>
                    ${skills.map(skill => this.createSkillItem(skill)).join('')}
                </div>
            `;
        });

        skillsGrid.innerHTML = skillsHTML;
    }

    createSkillItem(skill) {
        const percentage = (skill.skill * 100) / 5;
        const level = this.getSkillLevel(skill.skill);

        return `
            <div class="skill-item">
                <div class="skill-name">
                    <span>${skill.name}</span>
                    <span class="skill-level">${percentage}% / ${level}</span>
                </div>
                <div class="skill-bar">
                    <div class="skill-progress" data-width="${percentage}%"></div>
                </div>
            </div>
        `;
    }

    getSkillLevel(skill) {
        const levels = {
            1: "Basic Knowledge",
            2: "Novice",
            3: "Intermediate",
            4: "Advanced",
            5: "Expert"
        };
        return levels[skill] || "Unknown";
    }

    renderExperience() {
        const timeline = document.getElementById('experienceTimeline');
        if (!timeline) return;

        let timelineHTML = '';

        this.experienceData.forEach((experience, index) => {
            timelineHTML += `
                <div class="timeline-item" data-aos="fade-up" data-aos-delay="${index * 100}">
                    <div class="timeline-marker">
                        <img src="${experience.logo}" alt="${experience.company} logo">
                    </div>
                    <div class="timeline-content">
                        <img src="${experience.logo}" alt="${experience.company}" class="company-logo">
                        <h3 class="job-title">${experience.role}</h3>
                        <div class="company-name">${experience.company}</div>
                        <div class="job-location">
                            <i class="fas fa-map-marker-alt"></i>
                            ${experience.location}
                        </div>
                        <div class="job-date">
                            ${experience.date.start} - ${experience.date.end}
                        </div>
                        <p class="job-description">
                            ${experience.tasks.slice(0, 2).join('. ')}.
                        </p>
                        <button class="read-more-btn" data-index="${index}" data-bs-toggle="modal" data-bs-target="#experienceModal">
                            Read More
                        </button>
                    </div>
                </div>
            `;
        });

        timeline.innerHTML = timelineHTML;
    }

    setupAnimations() {
        // Initialize AOS
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true,
                offset: 100
            });
        }

        // Animate skill bars when they come into view
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };

        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillBars = entry.target.querySelectorAll('.skill-progress');
                    skillBars.forEach(bar => {
                        const width = bar.dataset.width;
                        bar.style.setProperty('--skill-width', width);
                        bar.classList.add('animate');
                        
                        // Animate width
                        setTimeout(() => {
                            bar.style.width = width;
                        }, 100);
                    });
                    skillObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe skill categories
        document.querySelectorAll('.skill-category').forEach(category => {
            skillObserver.observe(category);
        });

        // Add hover effects to timeline items
        document.querySelectorAll('.timeline-content').forEach(content => {
            content.addEventListener('mouseenter', () => {
                content.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            content.addEventListener('mouseleave', () => {
                content.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    setupModal() {
        // Handle modal content
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('read-more-btn')) {
                const index = parseInt(e.target.dataset.index);
                const experience = this.experienceData[index];
                this.populateModal(experience);
            }
        });
    }

    populateModal(experience) {
        const modalBody = document.getElementById('modalBody');
        const modalTitle = document.getElementById('experienceModalLabel');
        
        if (!modalBody || !modalTitle) return;

        modalTitle.textContent = `${experience.role} at ${experience.company}`;

        modalBody.innerHTML = `
            <div class="modal-company-info">
                <img src="${experience.logo}" alt="${experience.company}" class="modal-company-logo">
                <div class="modal-company-details">
                    <h3>${experience.company}</h3>
                    <p><i class="fas fa-map-marker-alt me-2"></i>${experience.location}</p>
                    <p><i class="fas fa-calendar me-2"></i>${experience.date.start} - ${experience.date.end}</p>
                    <p><i class="fas fa-briefcase me-2"></i>${experience.role}</p>
                </div>
            </div>
            <h4>Key Responsibilities & Achievements:</h4>
            <ul class="task-list">
                ${experience.tasks.map(task => `<li>${task}</li>`).join('')}
            </ul>
        `;
    }

    // Utility method to create a smooth scroll to top
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Method to export resume data (for future enhancement)
    exportResumeData() {
        const resumeData = {
            skills: this.skillsData,
            experience: this.experienceData,
            exportDate: new Date().toISOString()
        };
        
        const dataStr = JSON.stringify(resumeData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = 'vincenzo_ieva_resume_data.json';
        link.click();
    }

    // Method to print resume (for future enhancement)
    printResume() {
        const printWindow = window.open('', '_blank');
        const resumeContent = document.documentElement.outerHTML;
        
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Vincenzo Ieva - Resume</title>
                <style>
                    @media print {
                        .navbar, .footer, .btn { display: none !important; }
                        .timeline-content { break-inside: avoid; }
                        body { font-size: 12px; }
                    }
                </style>
            </head>
            <body>
                ${resumeContent}
            </body>
            </html>
        `);
        
        printWindow.document.close();
        printWindow.print();
    }
}

// Initialize resume page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const resumePage = new ResumePage();
    
    // Add scroll to top button functionality
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top-btn';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 1000;
        box-shadow: var(--shadow-lg);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    scrollToTopBtn.addEventListener('click', () => {
        resumePage.scrollToTop();
    });
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
        } else {
            scrollToTopBtn.style.opacity = '0';
        }
    });
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ResumePage;
}
