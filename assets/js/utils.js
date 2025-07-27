/**
 * Maxwell Consultancy Ltd - Utilities JavaScript
 * Author: Maxwell Web Team
 * Version: 1.0
 */

/**
 * Debounce function to limit how often a function can be called
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
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

/**
 * Throttle function to limit how often a function can be called
 * @param {Function} func - Function to throttle
 * @param {number} limit - Limit in milliseconds
 * @returns {Function} Throttled function
 */
function throttle(func, limit) {
  let inThrottle;
  
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

/**
 * Get current viewport size
 * @returns {Object} Object containing viewport width and height
 */
function getViewportSize() {
  return {
    width: window.innerWidth || document.documentElement.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight
  };
}

/**
 * Check if element is in viewport
 * @param {HTMLElement} el - Element to check
 * @param {number} offset - Offset from viewport edge (default: 0)
 * @returns {boolean} Is element in viewport
 */
function isElementInViewport(el, offset = 0) {
  const rect = el.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;
  
  return (
    rect.top >= -offset &&
    rect.left >= -offset &&
    rect.bottom <= windowHeight + offset &&
    rect.right <= windowWidth + offset
  );
}

/**
 * Get element's distance from top of document
 * @param {HTMLElement} el - Element to check
 * @returns {number} Distance from top in pixels
 */
function getOffsetTop(el) {
  let distance = 0;
  
  while (el) {
    distance += el.offsetTop;
    el = el.offsetParent;
  }
  
  return distance;
}

/**
 * Smooth scroll to element
 * @param {string|HTMLElement} target - Target element or selector
 * @param {number} offset - Offset from top (default: 0)
 * @param {number} duration - Animation duration in ms (default: 500)
 */
function smoothScrollTo(target, offset = 0, duration = 500) {
  // Get target element
  const targetElement = typeof target === 'string' ? document.querySelector(target) : target;
  
  if (!targetElement) return;
  
  // Get target position
  const targetPosition = getOffsetTop(targetElement) - offset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;
  
  // Animation function
  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }
  
  // Easing function
  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }
  
  requestAnimationFrame(animation);
}

/**
 * Format date
 * @param {Date|string} date - Date to format
 * @param {string} format - Format string (default: 'MMMM D, YYYY')
 * @returns {string} Formatted date
 */
function formatDate(date, format = 'MMMM D, YYYY') {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(d.getTime())) {
    return 'Invalid Date';
  }
  
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const shortDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  return format
    .replace('YYYY', d.getFullYear())
    .replace('YY', String(d.getFullYear()).substr(2, 2))
    .replace('MMMM', months[d.getMonth()])
    .replace('MMM', shortMonths[d.getMonth()])
    .replace('MM', String(d.getMonth() + 1).padStart(2, '0'))
    .replace('M', d.getMonth() + 1)
    .replace('DDDD', days[d.getDay()])
    .replace('DDD', shortDays[d.getDay()])
    .replace('DD', String(d.getDate()).padStart(2, '0'))
    .replace('D', d.getDate())
    .replace('HH', String(d.getHours()).padStart(2, '0'))
    .replace('H', d.getHours())
    .replace('hh', String(d.getHours() % 12 || 12).padStart(2, '0'))
    .replace('h', d.getHours() % 12 || 12)
    .replace('mm', String(d.getMinutes()).padStart(2, '0'))
    .replace('m', d.getMinutes())
    .replace('ss', String(d.getSeconds()).padStart(2, '0'))
    .replace('s', d.getSeconds())
    .replace('A', d.getHours() >= 12 ? 'PM' : 'AM')
    .replace('a', d.getHours() >= 12 ? 'pm' : 'am');
}

/**
 * Truncate text
 * @param {string} text - Text to truncate
 * @param {number} length - Maximum length
 * @param {string} suffix - Suffix to add (default: '...')
 * @returns {string} Truncated text
 */
function truncateText(text, length, suffix = '...') {
  if (text.length <= length) {
    return text;
  }
  
  return text.substring(0, length).trim() + suffix;
}

/**
 * Get URL parameters
 * @param {string} url - URL to parse (default: current URL)
 * @returns {Object} Object containing URL parameters
 */
function getUrlParameters(url = window.location.href) {
  const params = {};
  const parser = document.createElement('a');
  parser.href = url;
  
  const query = parser.search.substring(1);
  const vars = query.split('&');
  
  for (let i = 0; i < vars.length; i++) {
    if (vars[i] === '') continue;
    
    const pair = vars[i].split('=');
    params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }
  
  return params;
}

/**
 * Generate random string
 * @param {number} length - Length of string (default: 8)
 * @returns {string} Random string
 */
function generateRandomString(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return result;
}

/**
 * Format number with commas
 * @param {number} number - Number to format
 * @returns {string} Formatted number
 */
function formatNumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Get cookie value
 * @param {string} name - Cookie name
 * @returns {string|null} Cookie value or null if not found
 */
function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
  return match ? decodeURIComponent(match[3]) : null;
}

/**
 * Set cookie
 * @param {string} name - Cookie name
 * @param {string} value - Cookie value
 * @param {number} days - Days until expiration
 */
function setCookie(name, value, days) {
  let expires = '';
  
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = '; expires=' + date.toUTCString();
  }
  
  document.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=/';
}

/**
 * Delete cookie
 * @param {string} name - Cookie name
 */
function deleteCookie(name) {
  setCookie(name, '', -1);
}

/**
 * Detect mobile device
 * @returns {boolean} Is mobile device
 */
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * Get browser name and version
 * @returns {Object} Object containing browser name and version
 */
function getBrowser() {
  const ua = navigator.userAgent;
  let browser = 'Unknown';
  let version = 'Unknown';
  
  // Opera
  if ((navigator.opera && navigator.opera.version) || /OPR\/|Opera|Opera\//.test(ua)) {
    browser = 'Opera';
    version = /OPR\/|Opera\//.test(ua) ? ua.match(/(OPR|Opera)\/([\d.]+)/)[2] : navigator.opera.version();
  }
  // Edge
  else if (/Edg/.test(ua)) {
    browser = 'Edge';
    version = ua.match(/Edg\/([\d.]+)/)[1];
  }
  // Chrome
  else if (/Chrome/.test(ua)) {
    browser = 'Chrome';
    version = ua.match(/Chrome\/([\d.]+)/)[1];
  }
  // Safari
  else if (/Safari/.test(ua)) {
    browser = 'Safari';
    version = ua.match(/Version\/([\d.]+)/)[1];
  }
  // Firefox
  else if (/Firefox/.test(ua)) {
    browser = 'Firefox';
    version = ua.match(/Firefox\/([\d.]+)/)[1];
  }
  // IE
  else if (/MSIE|Trident/.test(ua)) {
    browser = 'Internet Explorer';
    version = /MSIE/.test(ua) ? ua.match(/MSIE ([\d.]+)/)[1] : ua.match(/rv:([\d.]+)/)[1];
  }
  
  return { name: browser, version: version };
}

/**
 * Export utilities
 */
const MaxwellUtils = {
  debounce,
  throttle,
  getViewportSize,
  isElementInViewport,
  getOffsetTop,
  smoothScrollTo,
  formatDate,
  truncateText,
  getUrlParameters,
  generateRandomString,
  formatNumberWithCommas,
  getCookie,
  setCookie,
  deleteCookie,
  isMobileDevice,
  getBrowser
}; 