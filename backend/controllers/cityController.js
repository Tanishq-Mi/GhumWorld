const City = require('../models/City');
const Place = require('../models/Place');

// @desc    Get all cities (PUBLIC)
// @route   GET /api/cities
// @access  Public

const getAllCities = async (req, res) => {
  try {
    const cities = await City.aggregate([
      { $sort: { name: 1 } },

      {
        $lookup: {
          from: 'places',
          localField: '_id',
          foreignField: 'cityId',
          as: 'places'
        }
      },

      {
        $addFields: {
          placesCount: { $size: '$places' }
        }
      },

      {
        $project: {
          name: 1,
          heroImage: 1,
          placesCount: 1
        }
      }
    ]);

    res.status(200).json(cities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// const getAllCities = async (req, res) => {
//   try {
//     const cities = await City.find().select('name heroImage').sort({ name: 1 });
//     res.status(200).json(cities);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// @desc    Get city by ID or name (PUBLIC)
// @route   GET /api/cities/:id
// @access  Public
const getCityById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Try to find by ID first, then by name
    let city = await City.findById(id);
    
    if (!city) {
      city = await City.findOne({ 
        name: { $regex: new RegExp(`^${id}$`, 'i') } 
      });
    }

    if (!city) {
      return res.status(404).json({ message: 'City not found' });
    }

    // Populate places
    const cityWithPlaces = await City.findById(city._id).populate('places');
    
    res.status(200).json(cityWithPlaces);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllCities,
  getCityById
};
