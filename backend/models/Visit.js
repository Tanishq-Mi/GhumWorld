const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
  date: {
    type: String, // Format: YYYY-MM-DD
    required: true,
    unique: true,
    index: true
  },
  count: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Compound index for date queries
visitSchema.index({ date: 1 });

module.exports = mongoose.model('Visit', visitSchema);
