const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

// General request rate limiter
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // Limit each IP to 300 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again after 15 minutes.'
  }
});

// Stricter rate limiter for contact form submissions to prevent mail/DB spam
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Limit each IP to 5 contact messages per hour
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many contact inquiries submited. Please wait an hour before messaging again.'
  }
});

// Helmet security headers with loose CSP config for portfolio CDN helper libraries
const helmetConfig = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'", 
        "'unsafe-inline'", 
        "'unsafe-eval'", 
        "https://cdnjs.cloudflare.com", 
        "https://cdn.jsdelivr.net",
        "https://unpkg.com"
      ],
      styleSrc: [
        "'self'", 
        "'unsafe-inline'", 
        "https://cdnjs.cloudflare.com", 
        "https://fonts.googleapis.com",
        "https://cdn.jsdelivr.net",
        "https://unpkg.com"
      ],
      imgSrc: [
        "'self'", 
        "data:", 
        "blob:",
        "https://*.githubusercontent.com", 
        "https://github-readme-stats.vercel.app", 
        "https://*.github.com",
        "https://images.unsplash.com"
      ],
      connectSrc: [
        "'self'", 
        "https://api.github.com",
        "https://cdnjs.cloudflare.com"
      ],
      fontSrc: [
        "'self'", 
        "https://fonts.gstatic.com", 
        "https://cdnjs.cloudflare.com"
      ],
      objectSrc: ["'self'", "data:", "blob:"],
      mediaSrc: ["'self'"],
      frameSrc: ["'self'", "https://www.google.com"] // For Google Maps embeds
    }
  },
  xssFilter: true,
  noSniff: true
});

// Simple sanitization middleware for inputs to avoid XSS injections
function sanitizeInput(req, res, next) {
  if (req.body) {
    for (const key in req.body) {
      if (typeof req.body[key] === 'string') {
        // Strip out basic HTML/Script tags to prevent raw XSS
        req.body[key] = req.body[key]
          .replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, '')
          .replace(/<\/?[^>]+(>|$)/g, '')
          .trim();
      }
    }
  }
  next();
}

module.exports = {
  generalLimiter,
  contactLimiter,
  helmetConfig,
  sanitizeInput
};
