const express = require('express');
const router = express.Router();
const {
  sendContactEmail,
  contactLimiter
} = require('../controllers/contactController');

// Public route
router.post('/', contactLimiter, sendContactEmail);

module.exports = router;
