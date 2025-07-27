/**
 * Maxwell Consultancy Ltd - Slider and Background Animations
 * Author: Maxwell Web Team
 * Version: 2.0
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize hero background slideshow
    initHeroBackgroundSlideshow();
  
    // Initialize header scroll effect
    initHeaderScroll();
  
    // Initialize project sliders if they exist
  initProjectSliders();
});

/**
 * Initialize the dynamic background slideshow for the hero section
 */
function initHeroBackgroundSlideshow() {
    const heroSection = document.querySelector('.hero--image');
    if (!heroSection) return;
    
    // Background images to cycle through
    const backgroundImages = [
        '../assets/images/hero/back1.png',
        '../assets/images/hero/back2.png',
        '../assets/images/hero/back3.png',
        '../assets/images/hero/background.png'
    ];
    
    // Create image container if it doesn't exist
    let imageContainer = heroSection.querySelector('.hero__image-container');
    if (!imageContainer) {
        imageContainer = document.createElement('div');
        imageContainer.className = 'hero__image-container';
        heroSection.prepend(imageContainer);
    }
    
    // Create overlay if it doesn't exist
    let overlay = imageContainer.querySelector('.hero__overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'hero__overlay';
        imageContainer.appendChild(overlay);
    }
    
    // Create and append all image elements
    const images = [];
    backgroundImages.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `Maxwell Consultancy Background ${index + 1}`;
        img.className = 'hero__image';
        img.style.opacity = index === 0 ? '1' : '0';
        img.style.zIndex = backgroundImages.length - index;
        img.style.position = 'absolute';
        img.style.top = '0';
        img.style.left = '0';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        img.style.transition = 'opacity 1.5s ease-in-out';
        imageContainer.appendChild(img);
        images.push(img);
    });
    
    // Set up the slideshow
    let currentImageIndex = 0;
    
    function showNextImage() {
        // Fade out current image
        images[currentImageIndex].style.opacity = '0';
        
        // Move to next image
        currentImageIndex = (currentImageIndex + 1) % images.length;
        
        // Fade in next image
        images[currentImageIndex].style.opacity = '1';
    }
    
    // Start the slideshow
    setInterval(showNextImage, 5000);
}

/**
 * Initialize header scroll effect
 */
function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/**
 * Initialize project sliders
 */
function initProjectSliders() {
  const projectSliders = document.querySelectorAll('.project-slider');
    if (projectSliders.length === 0) return;
  
  projectSliders.forEach(slider => {
        const slidesContainer = slider.querySelector('.project-slider__slides');
    const slides = slider.querySelectorAll('.project-slider__slide');
    const prevBtn = slider.querySelector('.project-slider__prev');
    const nextBtn = slider.querySelector('.project-slider__next');
        const pagination = slider.querySelector('.project-slider__pagination');
    
        if (!slidesContainer || slides.length === 0) return;
    
    let currentSlide = 0;
    
        // Create pagination dots
        if (pagination) {
      slides.forEach((_, index) => {
                const dot = document.createElement('span');
        dot.className = 'project-slider__dot';
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(index));
                pagination.appendChild(dot);
            });
        }
        
        // Set initial position
        updateSlidePosition();
        
        // Add event listeners
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                updateSlidePosition();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentSlide = (currentSlide + 1) % slides.length;
                updateSlidePosition();
            });
        }
        
        // Auto slide
        let slideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlidePosition();
        }, 5000);
        
        // Pause on hover
        slider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        slider.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
                currentSlide = (currentSlide + 1) % slides.length;
                updateSlidePosition();
            }, 5000);
        });
        
        // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
        });
    
    slider.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
        });
    
    function handleSwipe() {
            if (touchStartX - touchEndX > 50) {
                // Swipe left
                currentSlide = (currentSlide + 1) % slides.length;
                updateSlidePosition();
            } else if (touchEndX - touchStartX > 50) {
                // Swipe right
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                updateSlidePosition();
            }
        }
        
        function goToSlide(index) {
            currentSlide = index;
            updateSlidePosition();
        }
        
        function updateSlidePosition() {
            slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Update pagination
            if (pagination) {
                const dots = pagination.querySelectorAll('.project-slider__dot');
                dots.forEach((dot, index) => {
                    if (index === currentSlide) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
      }
    }
  });
} 