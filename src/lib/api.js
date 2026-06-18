import { secureStorage, sanitizeInput } from './security';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = null;
  }

  setToken(token) {
    this.token = token;
    secureStorage.setItem('token', token);
  }

  getToken() {
    if (typeof window !== 'undefined') {
      return secureStorage.getItem('token');
    }
    return null;
  }

  /**
   * Sanitize request data to prevent injection attacks
   */
  sanitizeData(data) {
    if (data === null || data === undefined) return data;
    if (typeof data === 'string') return sanitizeInput(data);
    if (Array.isArray(data)) return data.map(item => this.sanitizeData(item));
    if (typeof data === 'object') {
      const sanitized = {};
      for (const [key, value] of Object.entries(data)) {
        sanitized[key] = this.sanitizeData(value);
      }
      return sanitized;
    }
    return data;
  }

  async request(endpoint, options = {}) {
    const token = this.getToken();
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Sanitize request body if present
    let sanitizedBody = options.body;
    if (sanitizedBody && typeof sanitizedBody === 'string') {
      try {
        const parsed = JSON.parse(sanitizedBody);
        sanitizedBody = JSON.stringify(this.sanitizeData(parsed));
      } catch {
        sanitizedBody = sanitizeInput(sanitizedBody);
      }
    }

    const url = `${this.baseURL}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers,
      body: sanitizedBody,
      // Add timeout to prevent hanging requests
      signal: options.signal || AbortSignal.timeout(30000),
    });

    // Handle different response types
    const contentType = response.headers.get('content-type');
    let data;
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = { message: await response.text() };
    }

    if (!response.ok) {
      // Don't expose too much info to client
      const errorMessage = data.message || 'Something went wrong';
      throw new Error(errorMessage);
    }

    return data;
  }

  get(endpoint, options = {}) {
    return this.request(endpoint, { method: 'GET', ...options });
  }

  post(endpoint, body, options = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
      ...options,
    });
  }

  put(endpoint, body, options = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
      ...options,
    });
  }

  delete(endpoint, options = {}) {
    return this.request(endpoint, { method: 'DELETE', ...options });
  }
}

export const api = new ApiClient();
