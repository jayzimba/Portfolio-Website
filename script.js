// ===== PORTFOLIO WEBSITE JAVASCRIPT =====

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== SMOOTH SCROLLING =====
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== NAVBAR ACTIVE STATE =====
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.navbar-nav .nav-link');
    
    function updateActiveNavItem() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavItem);
    
    // ===== SCROLL ANIMATIONS =====
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
    
    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.bucket-item, .project-card, .cv-section, .contact-content');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // ===== SKILL PROGRESS ANIMATION =====
    function animateSkills() {
        const skillBars = document.querySelectorAll('.progress-bar');
        
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 500);
        });
    }
    
    // Trigger skill animation when about section is visible
    const aboutSection = document.querySelector('#about');
    const aboutObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                aboutObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (aboutSection) {
        aboutObserver.observe(aboutSection);
    }
    
    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.querySelector('.navbar');
    
    function handleNavbarScroll() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(44, 62, 80, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.2)';
        } else {
            navbar.style.background = 'rgba(44, 62, 80, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    }
    
    window.addEventListener('scroll', handleNavbarScroll);
    
    // ===== PROJECT CARD HOVER EFFECTS =====
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // ===== BUCKET LIST ITEM ANIMATIONS =====
    const bucketItems = document.querySelectorAll('.bucket-item');
    
    bucketItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
    
    // ===== CONTACT FORM HANDLING =====
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const subject = this.querySelector('input[placeholder="Subject"]').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Message sent successfully!', 'success');
            this.reset();
        });
    }
    
    // ===== EMAIL VALIDATION =====
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // ===== NOTIFICATION SYSTEM =====
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add notification styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 5px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 9999;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        });
    }
    
    // ===== TYPING ANIMATION =====
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Apply typing animation to hero title
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 50);
    }
    
    // ===== PARALLAX EFFECT =====
    // Removed parallax effect to fix scrolling issues
    // function handleParallax() {
    //     const scrolled = window.pageYOffset;
    //     const parallaxElements = document.querySelectorAll('.hero-section');
    //     
    //     parallaxElements.forEach(element => {
    //         const speed = 0.3;
    //             element.style.transform = `translateY(${scrolled * speed}px)`;
    //     });
    // }
    // 
    // // Use throttled scroll event for better performance
    // window.addEventListener('scroll', throttle(handleParallax, 16));
    
    // ===== MOBILE MENU TOGGLE =====
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            navbarCollapse.classList.toggle('show');
        });
        
        // Close mobile menu when clicking on a link
        const mobileNavLinks = navbarCollapse.querySelectorAll('.nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                navbarCollapse.classList.remove('show');
            });
        });
    }
    
    // ===== SCROLL TO TOP BUTTON =====
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--secondary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide scroll to top button
    function toggleScrollToTop() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    }
    
    window.addEventListener('scroll', toggleScrollToTop);
    
    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ===== LOADING ANIMATION =====
    function hideLoading() {
        const loading = document.querySelector('.loading');
        if (loading) {
            loading.classList.add('hidden');
            setTimeout(() => {
                loading.style.display = 'none';
            }, 500);
        }
    }
    
    // Hide loading after page loads
    window.addEventListener('load', hideLoading);
    
    // ===== PROGRAMMING SYMBOLS BACKGROUND =====
    function createProgrammingSymbols() {
        const heroSection = document.querySelector('.hero-section');
        if (!heroSection) return;
        
        const symbols = [
            '<', '>', '/', '{', '}', '(', ')', '[', ']', ';', '=', '+', '-', '*', '&', '|', '!', '?', ':', '.', ',', '@', '#', '$', '%', '^', '~'
        ];
        
        // Reduce number of symbols for better performance
        for (let i = 0; i < 15; i++) {
            const symbol = document.createElement('div');
            symbol.className = 'programming-symbol';
            const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
            
            symbol.innerHTML = randomSymbol;
            symbol.style.cssText = `
                position: absolute;
                color: rgba(255, 255, 255, 0.3);
                font-family: 'Courier New', monospace;
                font-size: ${Math.random() * 16 + 12}px;
                font-weight: bold;
                pointer-events: none;
                animation: floatSymbol 12s linear infinite;
                left: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 12}s;
                z-index: 1;
                will-change: transform;
            `;
            
            heroSection.appendChild(symbol);
        }
    }
    
    // Add programming symbols animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatSymbol {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 0.3;
            }
            90% {
                opacity: 0.3;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Initialize programming symbols
    createProgrammingSymbols();
    
    // ===== PERFORMANCE OPTIMIZATION =====
    let ticking = false;
    
    function updateOnScroll() {
        updateActiveNavItem();
        handleNavbarScroll();
        toggleScrollToTop();
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    }
    
    // Use throttled scroll event for better performance
    window.addEventListener('scroll', throttle(requestTick, 16));
    
    // ===== PLACES CAROUSEL FUNCTIONALITY =====
    function initPlacesCarousel() {
        const carouselTrack = document.querySelector('.carousel-track');
        const placeCards = document.querySelectorAll('.place-card');
        
        if (!carouselTrack || placeCards.length === 0) return;
        
        // Set initial active card (leftmost)
        placeCards.forEach((card, index) => {
            card.classList.remove('active');
            if (index === 0) {
                card.classList.add('active');
            }
        });
        
        // Update active card based on position
        function updateActiveCard() {
            const container = document.querySelector('.carousel-container');
            const containerRect = container.getBoundingClientRect();
            const containerCenter = containerRect.left + containerRect.width / 2;
            
            placeCards.forEach((card, index) => {
                const cardRect = card.getBoundingClientRect();
                const cardCenter = cardRect.left + cardRect.width / 2;
                const distance = Math.abs(cardCenter - containerCenter);
                
                // Remove active class from all cards
                card.classList.remove('active');
                
                // Add active class to the card closest to center
                if (distance < cardRect.width / 2) {
                    card.classList.add('active');
                }
            });
        }
        
        // Update active card periodically
        setInterval(updateActiveCard, 1000);
        
        // Pause animation on hover
        carouselTrack.addEventListener('mouseenter', () => {
            carouselTrack.style.animationPlayState = 'paused';
        });
        
        carouselTrack.addEventListener('mouseleave', () => {
            carouselTrack.style.animationPlayState = 'running';
        });
        
        // Click to focus on card
        placeCards.forEach(card => {
            card.addEventListener('click', () => {
                placeCards.forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                
                // Scroll card to center
                const cardRect = card.getBoundingClientRect();
                const containerRect = carouselTrack.getBoundingClientRect();
                const scrollLeft = card.offsetLeft - (containerRect.width / 2) + (cardRect.width / 2);
                
                carouselTrack.style.transform = `translateX(-${scrollLeft}px)`;
            });
        });
    }
    
    // ===== INITIALIZATION =====
    console.log('Portfolio website loaded successfully! 🚀');
    
    // Trigger initial animations
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = '1';
        }
        
        // Initialize places carousel
        initPlacesCarousel();
    }, 100);
    
});

// ===== UTILITY FUNCTIONS =====

// Debounce function for performance
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

// Throttle function for scroll events
function throttle(func, limit) {
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

// ===== EXPORT FOR MODULE USE (IF NEEDED) =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        debounce,
        throttle
    };
}
