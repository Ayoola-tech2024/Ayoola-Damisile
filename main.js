// Adams Portfolio - Main JavaScript

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeForm();
    initializeNavigation();
    initializeSkillsToggle();
    initializeScrollReveal();
    initializeP5Background();
});

// Typewriter Animation for Hero
function initializeAnimations() {
    // Typewriter effect
    const typed = new Typed('#typed-text', {
        strings: [
            'Adams',
            'Frontend Developer',
            'Pianist',
            'Creative Technologist'
        ],
        typeSpeed: 80,
        backSpeed: 50,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });

    // Animate skill bars when they come into view
    const skillBars = document.querySelectorAll('.skill-progress');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                setTimeout(() => {
                    entry.target.style.width = width + '%';
                }, 200);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));
}

// Dynamic Form Logic
function initializeForm() {
    const serviceType = document.getElementById('service-type');
    const musicFields = document.getElementById('music-fields');
    const websiteFields = document.getElementById('website-fields');
    const form = document.getElementById('hire-form');

    // Show/hide conditional fields based on service type
    serviceType.addEventListener('change', function() {
        const value = this.value;
        
        // Hide all conditional fields first
        musicFields.classList.add('hidden');
        websiteFields.classList.add('hidden');
        
        // Show relevant fields
        if (value === 'music') {
            musicFields.classList.remove('hidden');
            // Add animation
            anime({
                targets: musicFields,
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 500,
                easing: 'easeOutQuart'
            });
        } else if (value === 'website') {
            websiteFields.classList.remove('hidden');
            // Add animation
            anime({
                targets: websiteFields,
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 500,
                easing: 'easeOutQuart'
            });
        }
    });

    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmission();
    });
}

// Handle form submission and WhatsApp redirect
function handleFormSubmission() {
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        serviceType: document.getElementById('service-type').value,
        duration: document.getElementById('duration')?.value || '',
        projectDetails: document.getElementById('project-details')?.value || '',
        message: document.getElementById('message').value
    };

    // Validate required fields
    if (!formData.name || !formData.email || !formData.serviceType) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }

    // Format WhatsApp message based on service type
    let whatsappMessage = '';
    if (formData.serviceType === 'music') {
        whatsappMessage = `Hi Adams!
I am interested in Music/Piano lessons.

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Duration: ${formData.duration || 'Not specified'}
Message: ${formData.message || 'No additional message'}`;
    } else if (formData.serviceType === 'website') {
        whatsappMessage = `Hi Adams!
I want to hire you to build a website.

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Project Details: ${formData.projectDetails || 'Not specified'}
Message: ${formData.message || 'No additional message'}`;
    }

    // Encode message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/2348169787869?text=${encodedMessage}`;

    // Show success notification
    showNotification('Redirecting to WhatsApp...', 'success');
    
    // Redirect to WhatsApp after short delay
    setTimeout(() => {
        window.open(whatsappUrl, '_blank');
    }, 1000);
}

// Show notification messages
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(n => n.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification fixed top-20 right-4 z-50 px-6 py-4 rounded-lg shadow-lg text-white font-semibold ${
        type === 'success' ? 'bg-green-500' : 
        type === 'error' ? 'bg-red-500' : 'bg-blue-500'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);

    // Animate in
    anime({
        targets: notification,
        translateX: [300, 0],
        opacity: [0, 1],
        duration: 500,
        easing: 'easeOutQuart'
    });

    // Remove after 3 seconds
    setTimeout(() => {
        anime({
            targets: notification,
            translateX: [0, 300],
            opacity: [1, 0],
            duration: 500,
            easing: 'easeInQuart',
            complete: () => {
                notification.remove();
            }
        });
    }, 3000);
}

// Navigation functionality
function initializeNavigation() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#home') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
                    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                }
            }
        });
    });

    // Update active navigation link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

// Update active navigation link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop && 
            window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('text-gold');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('text-gold');
        }
    });
}

// Skills section toggle
function initializeSkillsToggle() {
    const techSkillsBtn = document.getElementById('tech-skills-btn');
    const musicSkillsBtn = document.getElementById('music-skills-btn');
    const techSkills = document.getElementById('tech-skills');
    const musicSkills = document.getElementById('music-skills');

    techSkillsBtn.addEventListener('click', function() {
        // Update button styles
        techSkillsBtn.className = 'px-6 py-3 bg-navy text-white rounded-lg font-semibold';
        musicSkillsBtn.className = 'px-6 py-3 border-2 border-navy text-navy rounded-lg font-semibold hover:bg-navy hover:text-white';
        
        // Show/hide skills
        techSkills.classList.remove('hidden');
        musicSkills.classList.add('hidden');
        
        // Animate skill bars
        setTimeout(() => {
            const skillBars = techSkills.querySelectorAll('.skill-progress');
            skillBars.forEach((bar, index) => {
                setTimeout(() => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width + '%';
                }, index * 100);
            });
        }, 200);
    });

    musicSkillsBtn.addEventListener('click', function() {
        // Update button styles
        musicSkillsBtn.className = 'px-6 py-3 bg-navy text-white rounded-lg font-semibold';
        techSkillsBtn.className = 'px-6 py-3 border-2 border-navy text-navy rounded-lg font-semibold hover:bg-navy hover:text-white';
        
        // Show/hide skills
        musicSkills.classList.remove('hidden');
        techSkills.classList.add('hidden');
        
        // Animate skill bars
        setTimeout(() => {
            const skillBars = musicSkills.querySelectorAll('.skill-progress');
            skillBars.forEach((bar, index) => {
                setTimeout(() => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width + '%';
                }, index * 100);
            });
        }, 200);
    });
}

// Scroll reveal animations
function initializeScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Add staggered animation for child elements
                const children = entry.target.querySelectorAll('.project-card, .skill-bar');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

// P5.js background animation
function initializeP5Background() {
    // Only initialize on larger screens to avoid performance issues
    if (window.innerWidth > 768) {
        new p5(backgroundSketch, 'p5-container');
    }
}

// P5.js sketch for animated background
function backgroundSketch(p) {
    let particles = [];
    let numParticles = 50;
    
    p.setup = function() {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.id('p5-canvas');
        
        // Create particles
        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: p.random(p.width),
                y: p.random(p.height),
                vx: p.random(-0.5, 0.5),
                vy: p.random(-0.5, 0.5),
                size: p.random(2, 6),
                opacity: p.random(0.1, 0.3)
            });
        }
    };
    
    p.draw = function() {
        p.clear();
        
        // Update and draw particles
        particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = p.width;
            if (particle.x > p.width) particle.x = 0;
            if (particle.y < 0) particle.y = p.height;
            if (particle.y > p.height) particle.y = 0;
            
            // Draw particle
            p.fill(212, 175, 55, particle.opacity * 255);
            p.noStroke();
            p.ellipse(particle.x, particle.y, particle.size);
        });
        
        // Draw connections between nearby particles
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dist = p.dist(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
                if (dist < 100) {
                    const alpha = p.map(dist, 0, 100, 0.1, 0);
                    p.stroke(212, 175, 55, alpha * 255);
                    p.strokeWeight(1);
                    p.line(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
                }
            }
        }
    };
    
    p.windowResized = function() {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
}

// Utility function for smooth scrolling
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
}

// Add hover effects to project cards
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.02,
                rotateX: 5,
                rotateY: 5,
                duration: 300,
                easing: 'easeOutQuart'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                rotateX: 0,
                rotateY: 0,
                duration: 300,
                easing: 'easeOutQuart'
            });
        });
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-bg');
    
    if (heroSection && scrolled < window.innerHeight) {
        heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Initialize skill bars animation on first load
document.addEventListener('DOMContentLoaded', function() {
    // Animate skill bars when skills section is visible
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillBars = entry.target.querySelectorAll('.skill-progress');
                    skillBars.forEach((bar, index) => {
                        setTimeout(() => {
                            const width = bar.getAttribute('data-width');
                            bar.style.width = width + '%';
                        }, index * 100);
                    });
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(skillsSection);
    }
});

// Add loading animation
window.addEventListener('load', function() {
    // Hide loading screen if exists
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }
    
    // Animate hero elements
    anime.timeline({
        easing: 'easeOutExpo',
        duration: 1000
    })
    .add({
        targets: '.hero-content h1',
        translateY: [60, 0],
        opacity: [0, 1],
        delay: 500
    })
    .add({
        targets: '.hero-content p',
        translateY: [40, 0],
        opacity: [0, 1],
        delay: 200
    }, '-=800')
    .add({
        targets: '.hero-content .flex',
        translateY: [30, 0],
        opacity: [0, 1],
        delay: anime.stagger(100)
    }, '-=600');
});