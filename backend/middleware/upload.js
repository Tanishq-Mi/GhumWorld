const multer = require('multer');
const { cityStorage, placeStorage } = require('../config/cloudinary');

// File filter
const fileFilter = (req, file, cb) => {
  // Accept images only
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

// Configure multer for city hero images
const uploadCity = multer({
  storage: cityStorage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: fileFilter
});

// Configure multer for place images
const uploadPlace = multer({
  storage: placeStorage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: fileFilter
});

// Single image upload for cities
const uploadSingle = uploadCity.single('image');

// Multiple images upload for places
const uploadMultiple = uploadPlace.array('images', 10);

module.exports = {
  uploadSingle,
  uploadMultiple
};
