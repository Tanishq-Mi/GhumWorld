const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'City name is required'],
    unique: true,
    trim: true
  },
  heroImage: {
    type: String,
    required: [true, 'Hero image is required']
  },
  history: {
    type: String,
    required: [true, 'History is required']
  },
  importance: {
    type: String,
    required: [true, 'Importance is required']
  },
  whyVisit: {
    type: String,
    required: [true, 'Why visit is required']
  },
  howToReach: {
    type: String,
    required: [true, 'How to reach is required']
  },
  places: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Place'
  }]
}, {
  timestamps: true
});

// Index for faster queries
citySchema.index({ name: 1 });

module.exports = mongoose.model('City', citySchema);
