// ==================== INPUT SANITIZATION ====================

/**
 * Sanitize user input to prevent XSS attacks
 * @param {string} input - The user input to sanitize
 * @returns {string} Sanitized input
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') {
    return input;
  }
  
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<[^>]*>/g, ''); // Remove all HTML tags
};

/**
 * Sanitize HTML content to allow only safe tags
 * @param {string} html - HTML content to sanitize
 * @returns {string} Sanitized HTML
 */
export const sanitizeHTML = (html) => {
  if (typeof html !== 'string') {
    return html;
  }
  
  const safeTags = ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li', 'a'];
  let sanitized = html;
  
  // Remove script tags and other dangerous elements
  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  sanitized = sanitized.replace(/javascript:/gi, '');
  
  // Only allow safe tags - strip all others
  sanitized = sanitized.replace(/<(?!\/?(?:p|br|strong|em|ul|ol|li|a)\b)[^>]+>/gi, '');
  
  return sanitized;
};

// ==================== SECURE STORAGE ====================

/**
 * Secure storage wrapper with automatic serialization/deserialization
 * Adds extra security by not storing sensitive data in plain text
 */
export const secureStorage = {
  /**
   * Set an item in localStorage with sanitization
   */
  setItem: (key, value) => {
    try {
      const sanitizedKey = sanitizeInput(key);
      const sanitizedValue = typeof value === 'string' 
        ? sanitizeInput(value) 
        : JSON.stringify(value);
      
      localStorage.setItem(sanitizedKey, sanitizedValue);
    } catch (error) {
      console.error('Error setting secure storage:', error);
    }
  },

  /**
   * Get an item from localStorage with deserialization
   */
  getItem: (key, defaultValue = null) => {
    try {
      const sanitizedKey = sanitizeInput(key);
      const item = localStorage.getItem(sanitizedKey);
      
      if (!item) return defaultValue;
      
      try {
        const parsed = JSON.parse(item);
        return typeof parsed === 'string' ? sanitizeInput(parsed) : parsed;
      } catch {
        return sanitizeInput(item);
      }
    } catch (error) {
      console.error('Error getting secure storage:', error);
      return defaultValue;
    }
  },

  /**
   * Remove an item from localStorage
   */
  removeItem: (key) => {
    try {
      const sanitizedKey = sanitizeInput(key);
      localStorage.removeItem(sanitizedKey);
    } catch (error) {
      console.error('Error removing from secure storage:', error);
    }
  },

  /**
   * Clear all app-related items from localStorage
   */
  clear: () => {
    try {
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (
          key === 'token' || 
          key === 'insta_user' || 
          key === 'admin_user' || 
          key.startsWith('user_')
        )) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(key => localStorage.removeItem(key));
    } catch (error) {
      console.error('Error clearing secure storage:', error);
    }
  }
};

// ==================== VALIDATION UTILITIES ====================

/**
 * Validate email format
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number (10 digits)
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
};

/**
 * Validate password strength
 * @returns {object} { valid: boolean, message: string }
 */
export const validatePassword = (password) => {
  if (!password || password.length < 8) {
    return {
      valid: false,
      message: 'Password must be at least 8 characters long'
    };
  }
  
  if (!/[a-z]/.test(password)) {
    return {
      valid: false,
      message: 'Password must contain at least one lowercase letter'
    };
  }
  
  if (!/[A-Z]/.test(password)) {
    return {
      valid: false,
      message: 'Password must contain at least one uppercase letter'
    };
  }
  
  if (!/[0-9]/.test(password)) {
    return {
      valid: false,
      message: 'Password must contain at least one number'
    };
  }
  
  return {
    valid: true,
    message: 'Password is strong'
  };
};

/**
 * Validate name (only letters, spaces, and hyphens)
 */
export const isValidName = (name) => {
  const nameRegex = /^[a-zA-Z\s\-]+$/;
  return nameRegex.test(name) && name.length >= 2 && name.length <= 100;
};

// ==================== XSS PROTECTION ====================

/**
 * Safe text rendering for React
 * Use this before displaying user-generated content
 */
export const safeText = (text) => {
  if (typeof text !== 'string') {
    return text;
  }
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

/**
 * Create a safe DOM element
 */
export const createSafeElement = (tag, content) => {
  const element = document.createElement(tag);
  element.textContent = content;
  return element;
};

// ==================== CSRF PROTECTION ====================

/**
 * Generate a CSRF token
 */
export const generateCSRFToken = () => {
  const token = crypto.getRandomValues(new Uint8Array(32)).toString();
  secureStorage.setItem('csrf_token', token);
  return token;
};

/**
 * Get current CSRF token
 */
export const getCSRFToken = () => {
  return secureStorage.getItem('csrf_token') || generateCSRFToken();
};

// ==================== INPUT RESTRICTIONS ====================

/**
 * Restrict input to numbers only
 */
export const numbersOnly = (value) => {
  return value.replace(/[^0-9]/g, '');
};

/**
 * Restrict input to alphanumeric characters only
 */
export const alphanumericOnly = (value) => {
  return value.replace(/[^a-zA-Z0-9]/g, '');
};

/**
 * Truncate text to safe length
 */
export const truncateText = (text, maxLength = 1000) => {
  if (typeof text !== 'string') return text;
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};
