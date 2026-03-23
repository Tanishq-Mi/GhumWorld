const express = require('express');
const router = express.Router();
const {
  getPlacesByCity,
  getPlaceById
} = require('../controllers/placeController');
const trackVisit = require('../middleware/visitTracker');

// Public routes - track visits
router.get('/city/:cityId', trackVisit, getPlacesByCity);
router.get('/:id', trackVisit, getPlaceById);

module.exports = router;
