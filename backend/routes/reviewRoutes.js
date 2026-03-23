const express = require('express');
const router = express.Router();
const {
  submitReview,
  getAllReviews,
  getReviewsByCity,
  reviewLimiter
} = require('../controllers/reviewController');

// Public routes
router.post('/', reviewLimiter, submitReview);
router.get('/', getAllReviews);
router.get('/city/:cityId', getReviewsByCity);

module.exports = router;
