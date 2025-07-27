# Maxwell Consultancy Ltd - Website

This repository contains the complete website for Maxwell Consultancy Ltd, an engineering and construction consultancy firm based in Kigali, Rwanda.

## Project Overview

The website is built using modern HTML5, CSS3, and JavaScript, following a responsive design approach to ensure optimal viewing experience across all devices. The site showcases the company's services, projects, team, and provides contact information for potential clients.

## Project Structure

```
maxwell/
│
├── assets/
│   ├── css/
│   │   ├── style.css          # Main stylesheet
│   │   ├── responsive.css     # Responsive design styles
│   │   ├── components.css     # Component-specific styles
│   │   └── animations.css     # Animation styles
│   │
│   ├── js/
│   │   ├── main.js            # Main JavaScript functionality
│   │   ├── animations.js      # Animation scripts
│   │   ├── form-handler.js    # Form handling and validation
│   │   ├── slider.js          # Slider/carousel functionality
│   │   └── utils.js           # Utility functions
│   │
│   ├── images/                # Image assets organized by category
│   │   ├── logo/
│   │   ├── team/
│   │   ├── projects/
│   │   ├── clients/
│   │   ├── hero/
│   │   └── icons/
│   │
│   └── fonts/                 # Web fonts
│
├── pages/                     # HTML pages
│   ├── index.html             # Homepage
│   ├── about.html             # About page
│   ├── services.html          # Services page
│   ├── projects.html          # Projects page
│   ├── team.html              # Team page
│   ├── careers.html           # Careers page
│   ├── news.html              # News page
│   └── contact.html           # Contact page
│
├── components/                # Reusable HTML components
│   ├── header.html
│   ├── footer.html
│   ├── navigation.html
│   └── contact-form.html
│
├── data/                      # JSON data files
│   ├── projects.json
│   ├── team.json
│   ├── services.json
│   └── clients.json
│
├── docs/                      # Documentation
│   ├── README.md              # This file
│   ├── DEPLOYMENT.md          # Deployment instructions
│   ├── STYLE-GUIDE.md         # Style guide
│   └── CONTENT-GUIDE.md       # Content guidelines
│
└── config/                    # Configuration files
    ├── .htaccess              # Apache server configuration
    ├── robots.txt             # Search engine instructions
    ├── sitemap.xml            # Site structure for search engines
    └── manifest.json          # Progressive Web App manifest
```

## Features

- **Responsive Design**: Mobile-first approach ensuring compatibility across all devices
- **Modern UI/UX**: Clean, professional design with intuitive navigation
- **Optimized Performance**: Fast loading times with optimized assets
- **Accessibility**: WCAG 2.1 compliant for maximum accessibility
- **SEO Friendly**: Proper meta tags, semantic HTML, and structured data
- **Interactive Elements**: Sliders, accordions, forms, and animations
- **Cross-Browser Compatible**: Works on all modern browsers

## Technology Stack

- **HTML5**: Semantic markup for better structure and SEO
- **CSS3**: Modern CSS features including Flexbox, Grid, and Custom Properties
- **JavaScript**: ES6+ features for enhanced interactivity
- **No external frameworks**: Built with vanilla HTML, CSS, and JavaScript for optimal performance

## Getting Started

### Prerequisites

- A modern web browser
- Basic knowledge of HTML, CSS, and JavaScript (for development)
- A web server or hosting service (for deployment)

### Local Development

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/maxwell-consultancy-website.git
   ```

2. Navigate to the project directory:
   ```
   cd maxwell-consultancy-website
   ```

3. Open the project in your preferred code editor.

4. To view the website locally, you can use a simple HTTP server:

   Using Python:
   ```
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```

   Using Node.js:
   ```
   # Install http-server globally
   npm install -g http-server
   
   # Run server
   http-server
   ```

5. Open your browser and navigate to `http://localhost:8000` or the port specified by your server.

## Deployment

For detailed deployment instructions, please refer to [DEPLOYMENT.md](DEPLOYMENT.md).

## Browser Support

The website is designed to work on the following browsers:

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimization

The website includes several performance optimizations:

- Minified CSS and JavaScript files
- Optimized images
- Lazy loading for images
- Efficient CSS selectors
- Minimal use of external resources
- Browser caching configuration

## SEO Considerations

The website is optimized for search engines with:

- Semantic HTML structure
- Proper heading hierarchy
- Meta tags for SEO and social sharing
- Structured data markup
- XML sitemap
- Robots.txt configuration

## Accessibility

The website follows WCAG 2.1 guidelines for accessibility:

- Proper use of ARIA attributes
- Keyboard navigation support
- Sufficient color contrast
- Alternative text for images
- Focus indicators for interactive elements
- Reduced motion option for animations

## Contributing

If you'd like to contribute to this project, please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature/your-feature-name`)
6. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any questions or inquiries about this project, please contact:

- **Email**: info@maxwellconsultancy.com
- **Website**: www.maxwellconsultancy.com
- **Phone**: +250 788 123 456

## Acknowledgements

- Icons: [Font Awesome](https://fontawesome.com/)
- Fonts: [Google Fonts](https://fonts.google.com/)
- Images: Used with permission from Maxwell Consultancy Ltd 