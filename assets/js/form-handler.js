/**
 * Maxwell Consultancy Ltd - Form Handler JavaScript
 * Author: Maxwell Web Team
 * Version: 1.0
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all forms
  initForms();
});

/**
 * Initialize all forms on the page
 */
function initForms() {
  // Contact form
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    initContactForm(contactForm);
  }
  
  // Newsletter form
  const newsletterForm = document.querySelector('#newsletter-form');
  if (newsletterForm) {
    initNewsletterForm(newsletterForm);
  }
  
  // Career application form
  const careerForm = document.querySelector('#career-application-form');
  if (careerForm) {
    initCareerForm(careerForm);
  }
}

/**
 * Initialize contact form
 * @param {HTMLFormElement} form - Contact form element
 */
function initContactForm(form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate form
    if (!validateForm(form)) {
      return;
    }
    
    // Show loading state
    const submitButton = form.querySelector('[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="loading-dots"><span></span><span></span><span></span></span>';
    
    // Simulate form submission (replace with actual AJAX call in production)
    setTimeout(() => {
      // Reset form
      form.reset();
      
      // Reset button
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
      
      // Show success message
      showFormMessage(form, 'Your message has been sent successfully. We will get back to you soon!', 'success');
    }, 1500);
  });
}

/**
 * Initialize newsletter form
 * @param {HTMLFormElement} form - Newsletter form element
 */
function initNewsletterForm(form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate form
    if (!validateForm(form)) {
      return;
    }
    
    // Show loading state
    const submitButton = form.querySelector('[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Subscribing...';
    
    // Simulate form submission (replace with actual AJAX call in production)
    setTimeout(() => {
      // Reset form
      form.reset();
      
      // Reset button
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
      
      // Show success message
      showFormMessage(form, 'Thank you for subscribing to our newsletter!', 'success');
    }, 1000);
  });
}

/**
 * Initialize career application form
 * @param {HTMLFormElement} form - Career application form element
 */
function initCareerForm(form) {
  // Initialize file input
  const fileInput = form.querySelector('input[type="file"]');
  if (fileInput) {
    initFileInput(fileInput);
  }
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate form
    if (!validateForm(form)) {
      return;
    }
    
    // Show loading state
    const submitButton = form.querySelector('[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="loading-dots"><span></span><span></span><span></span></span>';
    
    // Simulate form submission (replace with actual AJAX call in production)
    setTimeout(() => {
      // Reset form
      form.reset();
      
      // Reset file input
      if (fileInput) {
        const fileLabel = fileInput.parentNode.querySelector('.form__file-name');
        if (fileLabel) {
          fileLabel.textContent = 'No file chosen';
        }
      }
      
      // Reset button
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
      
      // Show success message
      showFormMessage(form, 'Your application has been submitted successfully!', 'success');
    }, 2000);
  });
}

/**
 * Initialize file input with custom styling
 * @param {HTMLInputElement} fileInput - File input element
 */
function initFileInput(fileInput) {
  // Create custom file input elements
  const fileContainer = document.createElement('div');
  fileContainer.className = 'form__file-container';
  
  const fileButton = document.createElement('button');
  fileButton.type = 'button';
  fileButton.className = 'form__file-button';
  fileButton.textContent = 'Choose File';
  
  const fileName = document.createElement('span');
  fileName.className = 'form__file-name';
  fileName.textContent = 'No file chosen';
  
  // Insert custom elements
  fileInput.parentNode.insertBefore(fileContainer, fileInput);
  fileContainer.appendChild(fileInput);
  fileContainer.appendChild(fileButton);
  fileContainer.appendChild(fileName);
  
  // Add event listener to button
  fileButton.addEventListener('click', () => {
    fileInput.click();
  });
  
  // Update file name when file is selected
  fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
      fileName.textContent = fileInput.files[0].name;
    } else {
      fileName.textContent = 'No file chosen';
    }
  });
}

/**
 * Validate form
 * @param {HTMLFormElement} form - Form to validate
 * @returns {boolean} Is form valid
 */
function validateForm(form) {
  const inputs = form.querySelectorAll('input, textarea, select');
  let isValid = true;
  
  // Remove all existing error messages
  const existingErrors = form.querySelectorAll('.form__error');
  existingErrors.forEach(error => {
    error.remove();
  });
  
  inputs.forEach(input => {
    // Skip inputs that don't need validation
    if (!input.hasAttribute('required') && input.value === '') {
      return;
    }
    
    // Validate based on input type
    let errorMessage = '';
    
    if (input.hasAttribute('required') && input.value === '') {
      errorMessage = 'This field is required';
    } else if (input.type === 'email' && input.value !== '') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.value)) {
        errorMessage = 'Please enter a valid email address';
      }
    } else if (input.type === 'tel' && input.value !== '') {
      const phoneRegex = /^\+?[0-9\s\-\(\)]{8,20}$/;
      if (!phoneRegex.test(input.value)) {
        errorMessage = 'Please enter a valid phone number';
      }
    } else if (input.type === 'file' && input.hasAttribute('required')) {
      if (input.files.length === 0) {
        errorMessage = 'Please select a file';
      } else {
        // Validate file type if accept attribute is present
        if (input.hasAttribute('accept')) {
          const acceptedTypes = input.getAttribute('accept').split(',');
          const fileType = input.files[0].type;
          const fileName = input.files[0].name;
          const fileExtension = '.' + fileName.split('.').pop().toLowerCase();
          
          let isAccepted = false;
          for (let type of acceptedTypes) {
            type = type.trim();
            if (type === fileType || type === fileExtension || type === '.' + fileType.split('/').pop()) {
              isAccepted = true;
              break;
            } else if (type.includes('/*')) {
              const baseType = type.split('/')[0];
              if (fileType.startsWith(baseType)) {
                isAccepted = true;
                break;
              }
            }
          }
          
          if (!isAccepted) {
            errorMessage = 'Please select a valid file type';
          }
        }
        
        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (input.files[0].size > maxSize) {
          errorMessage = 'File size must be less than 5MB';
        }
      }
    }
    
    // If there's an error, show it and mark form as invalid
    if (errorMessage) {
      isValid = false;
      input.classList.add('form__input--error');
      
      // Find the parent form group
      let formGroup = input.closest('.form__group');
      if (!formGroup) {
        formGroup = input.parentNode;
      }
      
      // Create error element
      const errorElement = document.createElement('div');
      errorElement.className = 'form__error';
      errorElement.textContent = errorMessage;
      
      // Add error element to form group
      formGroup.appendChild(errorElement);
    } else {
      input.classList.remove('form__input--error');
    }
  });
  
  return isValid;
}

/**
 * Show form message (success or error)
 * @param {HTMLFormElement} form - Form element
 * @param {string} message - Message to display
 * @param {string} type - Message type (success or error)
 */
function showFormMessage(form, message, type = 'success') {
  // Remove any existing messages
  const existingMessage = form.querySelector('.form__message');
  if (existingMessage) {
    existingMessage.remove();
  }
  
  // Create message element
  const messageElement = document.createElement('div');
  messageElement.className = `form__message form__message--${type}`;
  messageElement.textContent = message;
  
  // Add message to form
  form.appendChild(messageElement);
  
  // Scroll to message
  messageElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  
  // Remove message after 5 seconds for success messages
  if (type === 'success') {
    setTimeout(() => {
      messageElement.classList.add('form__message--fade-out');
      
      setTimeout(() => {
        messageElement.remove();
      }, 300);
    }, 5000);
  }
}

/**
 * Send form data via AJAX
 * @param {HTMLFormElement} form - Form element
 * @param {string} url - URL to send data to
 * @param {Function} callback - Callback function to handle response
 */
function sendFormData(form, url, callback) {
  // Create form data
  const formData = new FormData(form);
  
  // Create AJAX request
  const xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  
  // Set up event handlers
  xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300) {
      // Success
      callback(null, xhr.responseText);
    } else {
      // Error
      callback(new Error(`Request failed with status ${xhr.status}`), null);
    }
  };
  
  xhr.onerror = function() {
    callback(new Error('Request failed'), null);
  };
  
  // Send request
  xhr.send(formData);
} 