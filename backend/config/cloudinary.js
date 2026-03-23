const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Create storage for cities (hero images)
const cityStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'travel-app/cities',
      public_id: (req, file) => Date.now() + '-' + file.originalname,
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 1200, height: 800, crop: 'limit' }]
  }
});

// Create storage for places (multiple images)
const placeStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'travel-app/places',
      public_id: (req, file) => Date.now() + '-' + file.originalname,
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 1000, height: 750, crop: 'limit' }]
  }
});

module.exports = {
  cloudinary,
  cityStorage,
  placeStorage
};
