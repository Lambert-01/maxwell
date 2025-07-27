# Deployment Guide for Maxwell Consultancy Website

This document provides detailed instructions for deploying the Maxwell Consultancy website to various hosting environments.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Preparing Files for Deployment](#preparing-files-for-deployment)
3. [Deployment Options](#deployment-options)
   - [Shared Hosting](#shared-hosting)
   - [VPS/Dedicated Server](#vpsdedicated-server)
   - [Cloud Hosting](#cloud-hosting)
4. [Domain Configuration](#domain-configuration)
5. [SSL Certificate Setup](#ssl-certificate-setup)
6. [Post-Deployment Checklist](#post-deployment-checklist)
7. [Troubleshooting](#troubleshooting)

## Prerequisites

Before deploying the website, ensure you have:

- All website files ready for deployment
- Access to your hosting account or server
- Domain name (if applicable)
- FTP credentials or SSH access (depending on your hosting provider)
- Any necessary database credentials (for future dynamic features)

## Preparing Files for Deployment

1. **Optimize Assets**
   - Minify CSS files:
     ```
     npx clean-css-cli -o assets/css/style.min.css assets/css/style.css
     npx clean-css-cli -o assets/css/components.min.css assets/css/components.css
     npx clean-css-cli -o assets/css/responsive.min.css assets/css/responsive.css
     npx clean-css-cli -o assets/css/animations.min.css assets/css/animations.css
     ```
   - Minify JavaScript files:
     ```
     npx terser assets/js/main.js -o assets/js/main.min.js
     npx terser assets/js/animations.js -o assets/js/animations.min.js
     npx terser assets/js/form-handler.js -o assets/js/form-handler.min.js
     npx terser assets/js/slider.js -o assets/js/slider.min.js
     npx terser assets/js/utils.js -o assets/js/utils.min.js
     ```
   - Optimize images:
     ```
     npx imagemin-cli assets/images/**/* --out-dir=assets/images/
     ```

2. **Update HTML Files**
   - Update file references to use minified versions
   - Ensure all paths are correct (relative or absolute as needed)
   - Verify all links work properly

3. **Create Production Configuration**
   - Update robots.txt for production
   - Generate sitemap.xml
   - Configure .htaccess for production settings

## Deployment Options

### Shared Hosting

Most shared hosting providers offer cPanel or a similar control panel.

1. **Using FTP/SFTP**
   - Connect to your server using FTP credentials
   - Upload all website files to the public_html directory (or equivalent)
   - Ensure file permissions are set correctly:
     - HTML/CSS/JS files: 644
     - Directories: 755
     - Executable scripts (if any): 755

2. **Using cPanel File Manager**
   - Log in to your cPanel account
   - Navigate to File Manager
   - Upload all website files to the public_html directory
   - Check file permissions as mentioned above

### VPS/Dedicated Server

For VPS or dedicated server deployment, you'll need SSH access.

1. **Using SSH**
   - Connect to your server:
     ```
     ssh username@your_server_ip
     ```
   - Navigate to the web root directory (often /var/www/html/):
     ```
     cd /var/www/html/
     ```
   - Create a directory for the website:
     ```
     mkdir maxwell
     cd maxwell
     ```
   - Upload files using SCP or rsync:
     ```
     # From your local machine
     rsync -avz --exclude 'node_modules' --exclude '.git' /path/to/local/maxwell/ username@your_server_ip:/var/www/html/maxwell/
     ```

2. **Web Server Configuration**
   - For Apache, ensure the virtual host is configured:
     ```
     # Example Apache Virtual Host configuration
     <VirtualHost *:80>
         ServerName maxwellconsultancy.com
         ServerAlias www.maxwellconsultancy.com
         DocumentRoot /var/www/html/maxwell
         
         <Directory /var/www/html/maxwell>
             Options -Indexes +FollowSymLinks
             AllowOverride All
             Require all granted
         </Directory>
         
         ErrorLog ${APACHE_LOG_DIR}/maxwell_error.log
         CustomLog ${APACHE_LOG_DIR}/maxwell_access.log combined
     </VirtualHost>
     ```
   - For Nginx:
     ```
     # Example Nginx configuration
     server {
         listen 80;
         server_name maxwellconsultancy.com www.maxwellconsultancy.com;
         root /var/www/html/maxwell;
         index index.html;
         
         location / {
             try_files $uri $uri/ =404;
         }
         
         # Additional configuration for caching static assets
         location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
             expires 30d;
             add_header Cache-Control "public, no-transform";
         }
         
         # Redirect requests for non-existent files to 404 page
         error_page 404 /404.html;
     }
     ```

3. **Restart Web Server**
   - For Apache:
     ```
     sudo systemctl restart apache2
     ```
   - For Nginx:
     ```
     sudo systemctl restart nginx
     ```

### Cloud Hosting

#### AWS S3 Static Website Hosting

1. **Create an S3 Bucket**
   - Log in to AWS Console
   - Navigate to S3
   - Create a new bucket (name it after your domain, e.g., maxwellconsultancy.com)
   - Enable "Static website hosting" under bucket properties
   - Set index document to "index.html"
   - Set error document to "404.html"

2. **Upload Files**
   - Upload all website files to the S3 bucket
   - Set appropriate permissions (public read access for website files)

3. **Configure CloudFront (Optional but Recommended)**
   - Create a CloudFront distribution pointing to your S3 bucket
   - Configure SSL certificate via AWS Certificate Manager
   - Set up custom domain

#### Netlify Deployment

1. **Connect to Git Repository**
   - Sign up/in to Netlify
   - Click "New site from Git"
   - Connect to your Git provider (GitHub, GitLab, Bitbucket)
   - Select your repository

2. **Configure Build Settings**
   - Build command: Leave blank (for static site)
   - Publish directory: `.` (root directory)

3. **Deploy**
   - Click "Deploy site"
   - Netlify will provide a temporary URL
   - Configure custom domain in the Netlify dashboard

## Domain Configuration

1. **DNS Configuration**
   - Log in to your domain registrar's control panel
   - Update nameservers if using a different DNS provider
   - Add/update A records to point to your server's IP address:
     ```
     A     @     your_server_ip
     A     www   your_server_ip
     ```
   - For cloud hosting, follow provider-specific instructions:
     - AWS: Use Route 53 or create CNAME records
     - Netlify: Add custom domain in dashboard and update DNS records

2. **Wait for DNS Propagation**
   - DNS changes can take up to 48 hours to propagate globally
   - Use tools like [whatsmydns.net](https://www.whatsmydns.net/) to check propagation status

## SSL Certificate Setup

### Using Let's Encrypt (Recommended for VPS/Dedicated)

1. **Install Certbot**
   - For Ubuntu/Debian:
     ```
     sudo apt-get update
     sudo apt-get install certbot
     ```
   - For Apache:
     ```
     sudo apt-get install python3-certbot-apache
     ```
   - For Nginx:
     ```
     sudo apt-get install python3-certbot-nginx
     ```

2. **Obtain Certificate**
   - For Apache:
     ```
     sudo certbot --apache -d maxwellconsultancy.com -d www.maxwellconsultancy.com
     ```
   - For Nginx:
     ```
     sudo certbot --nginx -d maxwellconsultancy.com -d www.maxwellconsultancy.com
     ```

3. **Set Up Auto-Renewal**
   - Certbot should automatically create a renewal cron job
   - Verify with:
     ```
     sudo systemctl list-timers
     ```

### Using Hosting Provider's SSL

Most shared hosting providers offer free SSL certificates through cPanel or their control panel.

1. **cPanel SSL/TLS**
   - Log in to cPanel
   - Navigate to SSL/TLS section
   - Select "Install and Manage SSL for your site (HTTPS)"
   - Follow the provider's instructions to install the certificate

## Post-Deployment Checklist

After deploying the website, perform these checks:

1. **Functionality Testing**
   - Verify all pages load correctly
   - Test all links and navigation
   - Ensure forms work properly
   - Check all interactive elements (sliders, accordions, etc.)

2. **Mobile Responsiveness**
   - Test on various devices and screen sizes
   - Ensure proper display on mobile, tablet, and desktop

3. **Performance Testing**
   - Use tools like Google PageSpeed Insights, GTmetrix, or Lighthouse
   - Address any performance issues identified

4. **Browser Compatibility**
   - Test in Chrome, Firefox, Safari, and Edge
   - Check for any browser-specific issues

5. **SEO Verification**
   - Verify meta tags are present
   - Check robots.txt is accessible
   - Submit sitemap.xml to search engines
   - Test structured data with Google's Structured Data Testing Tool

6. **Security Checks**
   - Verify SSL certificate is working properly
   - Check for any exposed sensitive files
   - Ensure proper file permissions

## Troubleshooting

### Common Issues and Solutions

1. **404 Errors**
   - Check file paths and case sensitivity
   - Verify .htaccess configuration
   - Ensure files were uploaded correctly

2. **CSS/JS Not Loading**
   - Check file paths
   - Verify MIME types are configured correctly
   - Clear browser cache

3. **SSL Certificate Issues**
   - Verify certificate installation
   - Check for mixed content warnings
   - Ensure all resources load over HTTPS

4. **Slow Loading Times**
   - Enable compression (Gzip/Brotli)
   - Optimize images further
   - Implement browser caching
   - Consider a CDN

5. **Form Submission Problems**
   - Check form action URLs
   - Verify server-side processing (if applicable)
   - Look for JavaScript errors in the console

### Getting Help

If you encounter issues not covered in this guide:

1. Check the hosting provider's documentation
2. Contact your hosting provider's support
3. Consult web development forums or communities
4. Reach out to the website development team

## Maintenance

After deployment, regular maintenance is important:

1. **Regular Backups**
   - Set up automated backups
   - Store backups in multiple locations

2. **Updates**
   - Keep server software updated
   - Update website content as needed
   - Refresh SSL certificates before expiration

3. **Monitoring**
   - Set up uptime monitoring
   - Monitor website performance
   - Check server logs periodically

---

For additional assistance or questions about deployment, please contact the development team at dev@maxwellconsultancy.com. 