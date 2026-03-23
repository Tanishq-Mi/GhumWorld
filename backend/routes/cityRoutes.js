const express = require('express');
const router = express.Router();
const {
  getAllCities,
  getCityById
} = require('../controllers/cityController');
const trackVisit = require('../middleware/visitTracker');

// Public routes - track visits
router.get('/', trackVisit, getAllCities);
router.get('/:id', trackVisit, getCityById);

module.exports = router;
