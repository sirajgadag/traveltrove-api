import Favorite from '../models/Favorite.js';
import DestinationGuide from '../models/DestinationGuide.js';
import TripItinerary from '../models/TripItinerary.js';

export const addFavorite = async (req, res) => {
  try {
    const { type, id } = req.body;
    const userId = req.userId;

    // Verify the item exists
    let item;
    if (type === 'destination-guide') {
      item = await DestinationGuide.findById(id);
    } else if (type === 'trip-itinerary') {
      item = await TripItinerary.findById(id);
    } else {
      return res.status(400).json({ error: "Invalid favorite type" });
    }

    if (!item) return res.status(404).json({ error: `${type} not found` });

    const favorite = await Favorite.create({
      user: userId,
      type,
      itemId: id
    });

    res.json({ message: `${type} added to favorites`, id: favorite._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.userId });
    res.json({ favorites });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const removeFavorite = async (req, res) => {
  try {
    const favorite = await Favorite.findOneAndDelete({
      _id: req.params.id,
      user: req.userId
    });

    if (!favorite) return res.status(404).json({ error: "Favorite not found" });
    res.json({ message: "Favorite removed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};