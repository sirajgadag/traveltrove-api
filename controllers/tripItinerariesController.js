import TripItinerary from '../models/TripItinerary.js';

export const createTripItinerary = async (req, res) => {
  try {
    const { destination, duration, activities, lodging, dining } = req.body;
    
    const newItinerary = await TripItinerary.create({
      destination,
      duration,
      activities,
      lodging,
      dining
    });

    res.status(201).json({
      message: "Trip itinerary created successfully",
      id: newItinerary.id
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getTripItinerary = async (req, res) => {
  try {
    const itinerary = await TripItinerary.findOne({ id: req.params.id }).lean();
    if (!itinerary) return res.status(404).json({ error: "Trip itinerary not found" });

    res.json({
      id: itinerary.id,
      destination: itinerary.destination,
      duration: itinerary.duration,
      activities: itinerary.activities,
      lodging: itinerary.lodging,
      dining: itinerary.dining
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};