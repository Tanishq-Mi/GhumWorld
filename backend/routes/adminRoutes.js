const express = require('express');
const router = express.Router();
const {
  createCity,
  updateCity,
  deleteCity,
  createPlace,
  updatePlace,
  deletePlace,
  getStats
} = require('../controllers/adminController');
const adminMiddleware = require('../middleware/adminMiddleware');
const { uploadSingle, uploadMultiple } = require('../middleware/upload');

// All admin routes are protected
router.use(adminMiddleware);

// Stats
router.get('/stats', getStats);

// City routes
router.post('/city', createCity);
router.put('/city/:id', updateCity);
router.delete('/city/:id', deleteCity);

// Place routes
router.post('/place', createPlace);
router.put('/place/:id', updatePlace);
router.delete('/place/:id', deletePlace);

// Image upload routes
router.post('/upload/image',  (req, res, next) => {
    console.log("➡️ Before Multer");
    next();
  },
  uploadSingle, (req, res) => {

  console.log("✅ After Multer");
  console.log("FILE:", req.file);
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  res.status(200).json({
    message: 'Image uploaded successfully',
    imageUrl: req.file.path
  });
});

router.post('/upload/images', uploadMultiple, (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'No files uploaded' });
  }
  const imageUrls = req.files.map(file => file.path);
  res.status(200).json({
    message: 'Images uploaded successfully',
    imageUrls
  });
});

module.exports = router;
