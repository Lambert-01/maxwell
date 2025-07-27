/**
 * Maxwell Consultancy Ltd - Animations JavaScript
 * Author: Maxwell Web Team
 * Version: 2.0
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize animations
  initParallaxEffect();
  initCounterAnimation();
  initImageComparison();
  initTextAnimation();
  initScrollReveal();
});

/**
 * Initialize parallax effect for sections with parallax class
 */
function initParallaxEffect() {
  const parallaxElements = document.querySelectorAll('.parallax');
  
  if (parallaxElements.length === 0) return;
  
  window.addEventListener('scroll', function() {
    parallaxElements.forEach(element => {
      const scrollPosition = window.pageYOffset;
      const speed = element.getAttribute('data-speed') || 0.5;
      const yPos = -(scrollPosition * speed);
      
      element.style.backgroundPosition = `50% ${yPos}px`;
    });
  });
}

/**
 * Initialize counter animation for statistics
 */
function initCounterAnimation() {
  const counterElements = document.querySelectorAll('.counter');
  
  if (counterElements.length === 0) return;
  
  const options = {
    threshold: 0.8
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target'), 10);
        const duration = parseInt(counter.getAttribute('data-duration') || 2000, 10);
        const increment = target / (duration / 16);
        
        let current = 0;
        const updateCounter = () => {
          current += increment;
          if (current < target) {
            counter.textContent = Math.ceil(current);
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target;
          }
        };
        
        updateCounter();
        observer.unobserve(counter);
      }
    });
  }, options);
  
  counterElements.forEach(counter => {
    observer.observe(counter);
  });
}

/**
 * Initialize image comparison slider
 */
function initImageComparison() {
  const comparisons = document.querySelectorAll('.image-comparison');
  
  if (comparisons.length === 0) return;
  
  comparisons.forEach(comparison => {
    const slider = comparison.querySelector('.comparison-slider');
    const before = comparison.querySelector('.comparison-before');
    const beforeImg = before.querySelector('img');
    
    // Set initial position
    slider.style.left = '50%';
    before.style.width = '50%';
    
    // Handle slider drag
    let isDragging = false;
    
    const handleDrag = (e) => {
      if (!isDragging) return;
      
      const rect = comparison.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = (x / rect.width) * 100;
      
      // Constrain percentage between 0 and 100
      const constrainedPercentage = Math.max(0, Math.min(100, percentage));
      
      slider.style.left = `${constrainedPercentage}%`;
      before.style.width = `${constrainedPercentage}%`;
    };
    
    slider.addEventListener('mousedown', () => {
      isDragging = true;
    });
    
    window.addEventListener('mouseup', () => {
      isDragging = false;
    });
    
    window.addEventListener('mousemove', handleDrag);
    
    // Handle touch events
    slider.addEventListener('touchstart', () => {
      isDragging = true;
    });
    
    window.addEventListener('touchend', () => {
      isDragging = false;
    });
    
    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      
      const touch = e.touches[0];
      const rect = comparison.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const percentage = (x / rect.width) * 100;
      
      // Constrain percentage between 0 and 100
      const constrainedPercentage = Math.max(0, Math.min(100, percentage));
      
      slider.style.left = `${constrainedPercentage}%`;
      before.style.width = `${constrainedPercentage}%`;
    });
  });
}

/**
 * Initialize text animation for hero section
 */
function initTextAnimation() {
  const typingElements = document.querySelectorAll('.typing-text');
  
  if (typingElements.length === 0) return;
  
  typingElements.forEach(element => {
    const text = element.textContent;
    element.textContent = '';
    element.classList.add('typing');
    
    let i = 0;
    const speed = element.getAttribute('data-speed') || 50;
    
    function typeWriter() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
      } else {
        element.classList.remove('typing');
      }
    }
    
    typeWriter();
  });
}

/**
 * Initialize scroll reveal animations
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  
  if (revealElements.length === 0) return;
  
  const options = {
    threshold: 0.2
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, options);
  
  revealElements.forEach(element => {
    observer.observe(element);
  });
}

/**
 * Initialize AOS animations if AOS is available
 */
function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
      disable: 'mobile'
    });
  }
}

/**
 * Initialize tilt effect for cards
 */
function initTiltEffect() {
  const tiltElements = document.querySelectorAll('.tilt-effect');
  
  if (tiltElements.length === 0) return;
  
  tiltElements.forEach(element => {
    const maxTilt = element.getAttribute('data-tilt-max') || 10;
    const speed = element.getAttribute('data-tilt-speed') || 400;
    
    element.addEventListener('mousemove', (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const percentX = (x - centerX) / centerX;
      const percentY = (y - centerY) / centerY;
      
      const tiltX = maxTilt * percentY * -1;
      const tiltY = maxTilt * percentX;
      
      element.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      element.style.transition = 'none';
    });
    
    element.addEventListener('mouseleave', () => {
      element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      element.style.transition = `transform ${speed}ms ease-out`;
    });
  });
}

/**
 * Initialize floating animation for elements
 */
function initFloatingAnimation() {
  const floatingElements = document.querySelectorAll('.floating');
  
  if (floatingElements.length === 0) return;
  
  floatingElements.forEach((element, index) => {
    // Create different animation durations and delays for each element
    const duration = 3 + (index % 3);
    const delay = index * 0.2;
    
    element.style.animation = `float ${duration}s ease-in-out infinite`;
    element.style.animationDelay = `${delay}s`;
  });
}

// Call additional initialization functions
initAOS();
initTiltEffect();
initFloatingAnimation(); 