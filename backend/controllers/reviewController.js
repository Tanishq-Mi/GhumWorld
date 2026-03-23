const Review = require('../models/Review');
const rateLimit = require('express-rate-limit');

// Rate limiting for review submission
const reviewLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per window
  message: 'Too many review submissions, please try again later.'
});

// @desc    Submit a review
// @route   POST /api/reviews
// @access  Public
const submitReview = async (req, res) => {
  try {
    const { name, rating, message, cityId, placeId } = req.body;

    // Validation
    if (!name || !rating || !message) {
      return res.status(400).json({ message: 'Please provide name, rating, and message' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    // Create review
    const review = await Review.create({
      name: name.trim(),
      rating: parseInt(rating),
      message: message.trim(),
      cityId: cityId || null,
      placeId: placeId || null
    });

    res.status(201).json({
      message: 'Review submitted successfully',
      review
    });
  } catch (error) {
    console.error('Submit review error:', error);
    res.status(500).json({ 
      message: error.message || 'Server error during review submission' 
    });
  }
};

// @desc    Get all reviews (latest first)
// @route   GET /api/reviews
// @access  Public
const getAllReviews = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const reviews = await Review.find()
      .populate('cityId', 'name')
      .populate('placeId', 'name')
      .sort({ createdAt: -1 })
      .limit(limit);

    res.status(200).json(reviews);
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({ 
      message: error.message || 'Server error fetching reviews' 
    });
  }
};

// @desc    Get reviews for a specific city
// @route   GET /api/reviews/city/:cityId
// @access  Public
const getReviewsByCity = async (req, res) => {
  try {
    const { cityId } = req.params;
    const reviews = await Review.find({ cityId })
      .populate('placeId', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json(reviews);
  } catch (error) {
    console.error('Get city reviews error:', error);
    res.status(500).json({ 
      message: error.message || 'Server error fetching city reviews' 
    });
  }
};

module.exports = {
  submitReview,
  getAllReviews,
  getReviewsByCity,
  reviewLimiter
};
