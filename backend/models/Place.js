const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  cityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City',
    required: [true, 'City ID is required'],
    index: true
  },
  name: {
    type: String,
    required: [true, 'Place name is required'],
    trim: true
  },
  images: {
    type: [String],
    required: [true, 'At least one image is required']
  },
  history: {
    type: String,
    required: [true, 'History is required']
  },
  importance: {
    type: String,
    required: [true, 'Importance is required']
  },
  howToReach: {
    type: String,
    required: [true, 'How to reach is required']
  },
  mapLink: {
    type: String,
    trim: true
  },
  safetyTips: {
    type: [String],
    default: []
  }
}, {
  timestamps: true
});

// Index for faster queries
placeSchema.index({ cityId: 1 });

module.exports = mongoose.model('Place', placeSchema);
