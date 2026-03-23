const City = require('../models/City');
const Place = require('../models/Place');
const Visit = require('../models/Visit');

// @desc    Create a new city
// @route   POST /api/admin/city
// @access  Admin
const createCity = async (req, res) => {
  try {
    const { name, heroImage, history, importance, whyVisit, howToReach } = req.body;

    // Validation
    if (!name || !heroImage || !history || !importance || !whyVisit || !howToReach) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Check if city already exists
    const cityExists = await City.findOne({ 
      name: { $regex: new RegExp(`^${name}$`, 'i') } 
    });
    
    if (cityExists) {
      return res.status(400).json({ message: 'City already exists' });
    }

    // Create city
    const city = await City.create({
      name,
      heroImage,
      history,
      importance,
      whyVisit,
      howToReach,
      places: []
    });

    res.status(201).json({
      message: 'City created successfully',
      city
    });
  } catch (error) {
    console.error('Create city error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    
    if (error.code === 11000) {
      return res.status(400).json({ message: 'City already exists' });
    }
    
    res.status(500).json({ 
      message: error.message || 'Server error during city creation' 
    });
  }
};

// @desc    Update a city
// @route   PUT /api/admin/city/:id
// @access  Admin
const updateCity = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, heroImage, history, importance, whyVisit, howToReach } = req.body;

    const city = await City.findById(id);
    if (!city) {
      return res.status(404).json({ message: 'City not found' });
    }

    // Update fields
    if (name) city.name = name;
    if (heroImage) city.heroImage = heroImage;
    if (history) city.history = history;
    if (importance) city.importance = importance;
    if (whyVisit) city.whyVisit = whyVisit;
    if (howToReach) city.howToReach = howToReach;

    await city.save();

    res.status(200).json({
      message: 'City updated successfully',
      city
    });
  } catch (error) {
    console.error('Update city error:', error);
    res.status(500).json({ 
      message: error.message || 'Server error during city update' 
    });
  }
};

// @desc    Delete a city
// @route   DELETE /api/admin/city/:id
// @access  Admin
const deleteCity = async (req, res) => {
  try {
    const { id } = req.params;

    const city = await City.findById(id);
    if (!city) {
      return res.status(404).json({ message: 'City not found' });
    }

    // Delete all places associated with this city
    await Place.deleteMany({ cityId: id });

    // Delete city
    await City.findByIdAndDelete(id);

    res.status(200).json({ message: 'City deleted successfully' });
  } catch (error) {
    console.error('Delete city error:', error);
    res.status(500).json({ 
      message: error.message || 'Server error during city deletion' 
    });
  }
};

// @desc    Create a new place
// @route   POST /api/admin/place
// @access  Admin
const createPlace = async (req, res) => {
  try {
    const { cityId, name, images, history, importance, howToReach, mapLink, safetyTips } = req.body;

    // Validation
    if (!cityId || !name || !images || !history || !importance || !howToReach) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Verify city exists
    const city = await City.findById(cityId);
    if (!city) {
      return res.status(404).json({ message: 'City not found' });
    }

    // Create place
    const place = await Place.create({
      cityId,
      name,
      images: Array.isArray(images) ? images : [images],
      history,
      importance,
      howToReach,
      mapLink: mapLink || '',
      safetyTips: Array.isArray(safetyTips) ? safetyTips : (safetyTips ? [safetyTips] : [])
    });

    // Add place to city's places array
    city.places.push(place._id);
    await city.save();

    res.status(201).json({
      message: 'Place created successfully',
      place
    });
  } catch (error) {
    console.error('Create place error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    
    res.status(500).json({ 
      message: error.message || 'Server error during place creation' 
    });
  }
};

// @desc    Update a place
// @route   PUT /api/admin/place/:id
// @access  Admin
const updatePlace = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, images, history, importance, howToReach, mapLink, safetyTips } = req.body;

    const place = await Place.findById(id);
    if (!place) {
      return res.status(404).json({ message: 'Place not found' });
    }

    // Update fields
    if (name) place.name = name;
    if (images) place.images = Array.isArray(images) ? images : [images];
    if (history) place.history = history;
    if (importance) place.importance = importance;
    if (howToReach) place.howToReach = howToReach;
    if (mapLink !== undefined) place.mapLink = mapLink;
    if (safetyTips) place.safetyTips = Array.isArray(safetyTips) ? safetyTips : [safetyTips];

    await place.save();

    res.status(200).json({
      message: 'Place updated successfully',
      place
    });
  } catch (error) {
    console.error('Update place error:', error);
    res.status(500).json({ 
      message: error.message || 'Server error during place update' 
    });
  }
};

// @desc    Delete a place
// @route   DELETE /api/admin/place/:id
// @access  Admin
const deletePlace = async (req, res) => {
  try {
    const { id } = req.params;

    const place = await Place.findById(id);
    if (!place) {
      return res.status(404).json({ message: 'Place not found' });
    }

    const cityId = place.cityId;

    // Remove place from city's places array
    await City.findByIdAndUpdate(cityId, {
      $pull: { places: id }
    });

    // Delete place
    await Place.findByIdAndDelete(id);

    res.status(200).json({ message: 'Place deleted successfully' });
  } catch (error) {
    console.error('Delete place error:', error);
    res.status(500).json({ 
      message: error.message || 'Server error during place deletion' 
    });
  }
};

// @desc    Get admin statistics
// @route   GET /api/admin/stats
// @access  Admin
const getStats = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    // Get today's visits
    const todayVisit = await Visit.findOne({ date: today });
    const visitsToday = todayVisit ? todayVisit.count : 0;

    // Get this week's visits
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekStart = weekAgo.toISOString().split('T')[0];
    
    const weekVisits = await Visit.find({
      date: { $gte: weekStart }
    });
    const visitsThisWeek = weekVisits.reduce((sum, visit) => sum + visit.count, 0);

    // Get all-time visits
    const allVisits = await Visit.find();
    const visitsAllTime = allVisits.reduce((sum, visit) => sum + visit.count, 0);

    // Get counts
    const cityCount = await City.countDocuments();
    const placeCount = await Place.countDocuments();

    res.status(200).json({
      visits: {
        today: visitsToday,
        thisWeek: visitsThisWeek,
        allTime: visitsAllTime
      },
      content: {
        cities: cityCount,
        places: placeCount
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ 
      message: error.message || 'Server error fetching stats' 
    });
  }
};

module.exports = {
  createCity,
  updateCity,
  deleteCity,
  createPlace,
  updatePlace,
  deletePlace,
  getStats
};
