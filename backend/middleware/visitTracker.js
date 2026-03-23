const Visit = require('../models/Visit');

// Middleware to track page visits
const trackVisit = async (req, res, next) => {
  try {
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];
    
    // Increment visit count for today
    await Visit.findOneAndUpdate(
      { date: today },
      { $inc: { count: 1 } },
      { upsert: true, new: true }
    );
    
    // Continue to next middleware/route
    next();
  } catch (error) {
    // Don't block the request if tracking fails
    console.error('Visit tracking error:', error);
    next();
  }
};

module.exports = trackVisit;
