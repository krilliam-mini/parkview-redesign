/**
 * Chalkwell Park Rooms - Interactive Scripts
 * Refined English Elegance Theme
 */

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    initMobileMenu();

    // Scroll-based Navigation
    initScrollNav();

    // Smooth Scroll for Anchor Links
    initSmoothScroll();

    // Form Validation Enhancement
    initFormEnhancements();

    // Intersection Observer for Animations
    initScrollAnimations();
});

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            toggle.classList.toggle('active');

            // Animate hamburger to X
            const spans = toggle.querySelectorAll('span');
            if (toggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                toggle.classList.remove('active');
                const spans = toggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
}

/**
 * Scroll-based Navigation Styling
 */
function initScrollNav() {
    const nav = document.querySelector('.main-nav');

    if (nav) {
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            // Add shadow when scrolled
            if (currentScroll > 50) {
                nav.style.boxShadow = '0 2px 20px rgba(26, 58, 47, 0.1)';
            } else {
                nav.style.boxShadow = 'none';
            }

            lastScroll = currentScroll;
        });
    }
}

/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);

                if (target) {
                    const navHeight = document.querySelector('.main-nav')?.offsetHeight || 0;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

/**
 * Form Enhancements
 */
function initFormEnhancements() {
    const form = document.querySelector('.booking-form');

    if (form) {
        // Add focus styling to form groups
        const inputs = form.querySelectorAll('input, select, textarea');

        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.closest('.form-group')?.classList.add('focused');
            });

            input.addEventListener('blur', () => {
                input.closest('.form-group')?.classList.remove('focused');

                // Add filled class if has value
                if (input.value) {
                    input.closest('.form-group')?.classList.add('filled');
                } else {
                    input.closest('.form-group')?.classList.remove('filled');
                }
            });
        });

        // Form submission handler
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Basic validation
            let isValid = true;
            const required = form.querySelectorAll('[required]');

            required.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.closest('.form-group')?.classList.add('error');
                } else {
                    field.closest('.form-group')?.classList.remove('error');
                }
            });

            if (isValid) {
                // Show success message (in production, this would submit to server)
                const submitBtn = form.querySelector('[type="submit"]');
                const originalText = submitBtn.textContent;

                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;

                // Simulate form submission
                setTimeout(() => {
                    submitBtn.textContent = 'Enquiry Sent!';
                    submitBtn.style.background = '#2d5a47';

                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.style.background = '';
                        submitBtn.disabled = false;
                        form.reset();
                    }, 3000);
                }, 1500);
            }
        });
    }
}

/**
 * Scroll-triggered Animations
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.service-card, .wedding-service-item, .testimonial-card, .stat-item'
    );

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            observer.observe(el);
        });
    }
}

/**
 * Add parallax effect to hero section (subtle)
 */
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero, .wedding-hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        const heroHeight = hero.offsetHeight;

        if (scrolled < heroHeight) {
            const pattern = hero.querySelector('.hero-pattern');
            if (pattern) {
                pattern.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        }
    }
});
