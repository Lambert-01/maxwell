/**
 * Maxwell Consultancy Ltd - Main JavaScript
 * Author: Maxwell Web Team
 * Version: 2.0
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile navigation
    initMobileNav();
    
    // Initialize scroll effects
    initScrollEffects();
    
    // Initialize modal functionality
    initModals();
    
    // Initialize form validation
    initFormValidation();
    
    // Initialize smooth scroll for anchor links
    initSmoothScroll();
});

/**
 * Initialize mobile navigation
 */
function initMobileNav() {
    const mobileToggle = document.querySelector('.header__mobile-toggle');
    const nav = document.querySelector('.header__nav');
    const body = document.body;
    const dropdownLinks = document.querySelectorAll('.nav__item.dropdown > .nav__link');
    
    if (!mobileToggle || !nav) return;
    
    // Toggle mobile navigation
    mobileToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
        body.classList.toggle('nav-open');
});

    // Handle dropdown toggles on mobile
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 991) {
                e.preventDefault();
                const parent = this.parentElement;
                parent.classList.toggle('active');
            }
        });
    });
    
    // Close mobile nav when clicking outside
    document.addEventListener('click', function(e) {
        if (nav.classList.contains('active') && 
            !nav.contains(e.target) && 
            !mobileToggle.contains(e.target)) {
            mobileToggle.classList.remove('active');
            nav.classList.remove('active');
            body.classList.remove('nav-open');
        }
    });
    
    // Close mobile nav when window is resized to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 991 && nav.classList.contains('active')) {
            mobileToggle.classList.remove('active');
            nav.classList.remove('active');
            body.classList.remove('nav-open');
        }
    });
}

/**
 * Initialize scroll effects
 */
function initScrollEffects() {
    const header = document.querySelector('.header');
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    if (!header) return;
    
    // Add scrolled class to header when scrolling down
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            if (scrollTopBtn) scrollTopBtn.classList.add('visible');
        } else {
            header.classList.remove('scrolled');
            if (scrollTopBtn) scrollTopBtn.classList.remove('visible');
        }
    });
    
    // Add scroll-to-top functionality
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Add scroll indicator click functionality
    const scrollIndicator = document.querySelector('.hero__scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const nextSection = document.querySelector('.booking-form') || 
                               document.querySelector('.about-preview');
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

/**
 * Initialize modal functionality
 */
function initModals() {
    const modalTriggers = document.querySelectorAll('[data-toggle="modal"]');
    const modals = document.querySelectorAll('.modal');
    const body = document.body;
    
    if (modalTriggers.length === 0 || modals.length === 0) return;
    
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            const modal = document.querySelector(target);
            
            if (modal) {
                modal.style.display = 'flex';
                body.classList.add('modal-open');
                
                setTimeout(() => {
                    modal.classList.add('show');
                }, 10);
            }
        });
    });
    
    modals.forEach(modal => {
        const closeBtn = modal.querySelector('.modal__close');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                closeModal(modal);
            });
        }
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });
    
    // Close modal with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.show');
            if (activeModal) {
                closeModal(activeModal);
            }
        }
    });
    
    function closeModal(modal) {
        modal.classList.remove('show');
        
        setTimeout(() => {
            modal.style.display = 'none';
            body.classList.remove('modal-open');
            
            // Pause video if exists
            const video = modal.querySelector('video');
            if (video) {
                video.pause();
            }
        }, 300);
    }
}

/**
 * Initialize form validation
 */
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    if (forms.length === 0) return;
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let isValid = true;
            const requiredInputs = form.querySelectorAll('[required]');
            
            requiredInputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                    
                    const errorMsg = input.nextElementSibling?.classList.contains('form__error') 
                        ? input.nextElementSibling 
                        : document.createElement('span');
                    
                    if (!input.nextElementSibling?.classList.contains('form__error')) {
                        errorMsg.classList.add('form__error');
                        errorMsg.textContent = 'This field is required';
                        input.parentNode.insertBefore(errorMsg, input.nextSibling);
                    }
                } else {
                    input.classList.remove('error');
                    if (input.nextElementSibling?.classList.contains('form__error')) {
                        input.nextElementSibling.remove();
                    }
                    
                    // Email validation
                    if (input.type === 'email' && !validateEmail(input.value)) {
                        isValid = false;
                        input.classList.add('error');
                        
                        const errorMsg = input.nextElementSibling?.classList.contains('form__error') 
                            ? input.nextElementSibling 
                            : document.createElement('span');
                        
                        if (!input.nextElementSibling?.classList.contains('form__error')) {
                            errorMsg.classList.add('form__error');
                            errorMsg.textContent = 'Please enter a valid email address';
                            input.parentNode.insertBefore(errorMsg, input.nextSibling);
                        }
                    }
                }
            });
            
            if (!isValid) {
                e.preventDefault();
            }
        });
        
        // Live validation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    this.classList.add('error');
                    
                    if (!this.nextElementSibling?.classList.contains('form__error')) {
                        const errorMsg = document.createElement('span');
                        errorMsg.classList.add('form__error');
                        errorMsg.textContent = 'This field is required';
                        this.parentNode.insertBefore(errorMsg, this.nextSibling);
                    }
                } else {
                    this.classList.remove('error');
                    if (this.nextElementSibling?.classList.contains('form__error')) {
                        this.nextElementSibling.remove();
                    }
                    
                    // Email validation
                    if (this.type === 'email' && this.value.trim() && !validateEmail(this.value)) {
                        this.classList.add('error');
                        
                        if (!this.nextElementSibling?.classList.contains('form__error')) {
                            const errorMsg = document.createElement('span');
                            errorMsg.classList.add('form__error');
                            errorMsg.textContent = 'Please enter a valid email address';
                            this.parentNode.insertBefore(errorMsg, this.nextSibling);
                        }
                    }
            }
        });
        });
    });
}

/**
 * Initialize smooth scroll for anchor links
 */
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([data-toggle])');
    
    if (anchorLinks.length === 0) return;
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} Is email valid
 */
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
} 