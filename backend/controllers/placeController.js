const Place = require('../models/Place');
const City = require('../models/City');

// @desc    Get all places for a city (PUBLIC)
// @route   GET /api/places/city/:cityId
// @access  Public
const getPlacesByCity = async (req, res) => {
  try {
    const { cityId } = req.params;
    
    // Verify city exists
    const city = await City.findById(cityId);
    if (!city) {
      return res.status(404).json({ message: 'City not found' });
    }

    const places = await Place.find({ cityId }).select('name images cityId').sort({ name: 1 });
    res.status(200).json(places);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get place by ID (PUBLIC)
// @route   GET /api/places/:id
// @access  Public
const getPlaceById = async (req, res) => {
  try {
    const { id } = req.params;
    const place = await Place.findById(id).populate('cityId', 'name');

    if (!place) {
      return res.status(404).json({ message: 'Place not found' });
    }

    res.status(200).json(place);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPlacesByCity,
  getPlaceById
};
