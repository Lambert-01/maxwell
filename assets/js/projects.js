/**
 * Maxwell Consultancy Ltd - Projects JavaScript
 * Author: Maxwell Web Team
 * Version: 1.0
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  initProjectsPage();
  initProjectModal();
});

/**
 * Initialize projects page functionality
 */
function initProjectsPage() {
  // Project navigation tabs
  const projectTabs = document.querySelectorAll('.project-nav__tab');
  const projectSections = document.querySelectorAll('.projects-category');
  
  // Handle tab clicks
  projectTabs.forEach(tab => {
    tab.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Remove active class from all tabs
      projectTabs.forEach(t => t.classList.remove('active'));
      
      // Add active class to clicked tab
      this.classList.add('active');
      
      // Get target section ID
      const targetId = this.getAttribute('href').substring(1);
      
      // Scroll to target section with smooth behavior
      document.getElementById(targetId).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });
  
  // Handle scroll to highlight active tab
  window.addEventListener('scroll', function() {
    let currentSection = '';
    
    projectSections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.pageYOffset >= sectionTop - 200) {
        currentSection = section.getAttribute('id');
      }
    });
    
    projectTabs.forEach(tab => {
      tab.classList.remove('active');
      if (tab.getAttribute('href') === `#${currentSection}`) {
        tab.classList.add('active');
      }
    });
  });
}

/**
 * Initialize project modal functionality
 */
function initProjectModal() {
  // Project data (would normally come from an API or JSON file)
  const projectsData = {
    'rra-building': {
      title: 'Rwanda Revenue Authority Building',
      location: 'Kigali, Rwanda',
      client: 'Government of Rwanda',
      year: '2018',
      services: 'Structural Engineering, Construction Supervision',
      description: 'Structural design and construction supervision for the RRA headquarters in Kigali. This project involved complex engineering solutions for a 12-story office building with underground parking facilities.',
      challenge: 'The project required innovative structural solutions to accommodate the building\'s unique architectural design while ensuring earthquake resistance.',
      solution: 'Our team implemented a reinforced concrete frame structure with shear walls strategically placed to provide lateral stability against seismic forces.',
      results: 'The completed building stands as a landmark in Kigali\'s skyline and provides a modern, efficient workspace for over 500 employees.',
      images: [
        'rra-building-1.jpg',
        'rra-building-2.jpg',
        'rra-building-3.jpg'
      ]
    },
    'office-complex': {
      title: 'Kigali Office Complex',
      location: 'Kigali, Rwanda',
      client: 'Private Developer',
      year: '2020',
      services: 'Structural Design, MEP Engineering, Project Management',
      description: 'Design and engineering services for a modern 8-story office complex in Kigali\'s business district, featuring sustainable design elements and energy-efficient systems.',
      challenge: 'The client required a flexible office space that could accommodate multiple tenants with varying needs while maintaining high energy efficiency standards.',
      solution: 'We designed an adaptable floor plan with modular partitioning systems and implemented energy-efficient HVAC and lighting systems throughout the building.',
      results: 'The completed complex achieved a 30% reduction in energy consumption compared to similar buildings and has maintained 95% occupancy since completion.',
      images: [
        'office-complex-1.jpg',
        'office-complex-2.jpg',
        'office-complex-3.jpg'
      ]
    },
    'kigali-airport': {
      title: 'Kigali International Airport',
      location: 'Kigali, Rwanda',
      client: 'Rwanda Civil Aviation Authority',
      year: '2019',
      services: 'Civil Engineering, Structural Design, Project Management',
      description: 'Engineering consultancy for terminal expansion and runway improvements, enhancing the airport\'s capacity and operational efficiency.',
      challenge: 'The expansion needed to be completed while maintaining full airport operations, with minimal disruption to flights and passenger services.',
      solution: 'We developed a phased construction plan that allowed work to proceed in sections, with careful coordination of airside and landside operations.',
      results: 'The expanded terminal increased passenger capacity by 60%, while runway improvements allowed for larger aircraft to operate safely.',
      images: [
        'kigali-international-1.jpg',
        'kigali-international-2.jpg',
        'kigali-international-3.jpg'
      ]
    },
    'gatsibo-water': {
      title: 'Gatsibo Water Supply',
      location: 'Gatsibo District, Rwanda',
      client: 'Water and Sanitation Corporation (WASAC)',
      year: '2021',
      services: 'Water Engineering, Project Management, Construction Supervision',
      description: 'Design and implementation of water supply system serving 50,000 residents, including water treatment facilities and distribution networks.',
      challenge: 'The project area had challenging topography and limited existing infrastructure, requiring innovative solutions to ensure reliable water supply to all communities.',
      solution: 'We designed a gravity-fed system with strategically placed pumping stations and implemented a phased construction approach to prioritize areas with greatest need.',
      results: 'The completed system provides clean water to 50,000 residents, reducing waterborne diseases by 40% and decreasing water collection time from 3 hours to 15 minutes for most households.',
      images: [
        'gatsibo-water-1.jpg',
        'gatsibo-water-2.jpg',
        'gatsibo-water-3.jpg'
      ]
    }
  };
  
  // Elements
  const modal = document.querySelector('.project-modal');
  const modalClose = document.querySelector('.project-modal__close');
  const modalTitle = document.querySelector('.project-modal__title');
  const modalMainImage = document.querySelector('.project-modal__main-image img');
  const modalThumbnails = document.querySelector('.project-modal__thumbnails');
  const projectLinks = document.querySelectorAll('.project-card__link');
  
  // Project info elements
  const projectLocation = document.querySelector('.project-location');
  const projectClient = document.querySelector('.project-client');
  const projectYear = document.querySelector('.project-year');
  const projectServices = document.querySelector('.project-services');
  const projectDescription = document.querySelector('.project-modal__description');
  const projectChallenge = document.querySelector('.project-challenge');
  const projectSolution = document.querySelector('.project-solution');
  const projectResults = document.querySelector('.project-results');
  
  // Open modal when project link is clicked
  projectLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get project ID from data attribute
      const projectId = this.getAttribute('data-project');
      const project = projectsData[projectId];
      
      if (project) {
        // Fill modal with project data
        modalTitle.textContent = project.title;
        projectLocation.textContent = project.location;
        projectClient.textContent = project.client;
        projectYear.textContent = project.year;
        projectServices.textContent = project.services;
        projectDescription.textContent = project.description;
        projectChallenge.textContent = project.challenge;
        projectSolution.textContent = project.solution;
        projectResults.textContent = project.results;
        
        // Set main image
        modalMainImage.src = `../assets/images/projects/${getProjectCategory(projectId)}/${project.images[0]}`;
        modalMainImage.alt = project.title;
        
        // Clear thumbnails
        modalThumbnails.innerHTML = '';
        
        // Add thumbnails
        project.images.forEach(image => {
          const thumbnail = document.createElement('div');
          thumbnail.className = 'project-modal__thumbnail';
          
          const img = document.createElement('img');
          img.src = `../assets/images/projects/${getProjectCategory(projectId)}/${image}`;
          img.alt = project.title;
          
          thumbnail.appendChild(img);
          modalThumbnails.appendChild(thumbnail);
          
          // Thumbnail click event
          thumbnail.addEventListener('click', function() {
            modalMainImage.src = img.src;
            
            // Remove active class from all thumbnails
            document.querySelectorAll('.project-modal__thumbnail').forEach(thumb => {
              thumb.classList.remove('active');
            });
            
            // Add active class to clicked thumbnail
            this.classList.add('active');
          });
        });
        
        // Set first thumbnail as active
        if (modalThumbnails.firstChild) {
          modalThumbnails.firstChild.classList.add('active');
        }
        
        // Show modal
        modal.classList.add('active');
        document.body.classList.add('modal-open');
      }
    });
  });
  
  // Close modal when close button is clicked
  modalClose.addEventListener('click', function() {
    closeModal();
  });
  
  // Close modal when clicking outside content
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal();
    }
  });
  
  // Close modal when ESC key is pressed
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
  
  // Close modal function
  function closeModal() {
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
  }
  
  // Helper function to get project category from ID
  function getProjectCategory(projectId) {
    if (projectId.includes('water')) {
      return 'water-supply';
    } else if (projectId.includes('airport') || projectId.includes('highway') || projectId.includes('road') || projectId.includes('industrial')) {
      return 'airports';
    } else {
      return 'buildings';
    }
  }
} 