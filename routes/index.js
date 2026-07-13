const express = require('express');
const router = express.Router();

const portfolioController = require('../controllers/portfolioController');
const { contactLimiter, sanitizeInput } = require('../middlewares/security');

// Landing page view
router.get('/', portfolioController.getHome);

// Detailed Project review
router.get('/project/:id', portfolioController.getProjectDetail);

// Web engineering blogs
router.get('/blog', portfolioController.getBlog);

// Admin dashboard routes
router.get('/admin', portfolioController.getAdmin);
router.get('/admin/clear', portfolioController.getLogoutAdmin);

// Contact message handler (Rate limited to 5 runs per hour, inputs sanitized)
router.post('/contact', contactLimiter, sanitizeInput, portfolioController.postContact);

module.exports = router;
