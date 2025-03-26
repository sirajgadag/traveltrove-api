import DestinationGuide from '../models/DestinationGuide.js';
import TripItinerary from '../models/TripItinerary.js';
import User from '../models/User.js';
import Favorite from '../models/Favorite.js';

export const setupDatabase = async (req, res) => {
  try {
    // Clear existing data
    await Promise.all([
      DestinationGuide.deleteMany(),
      TripItinerary.deleteMany(),
      User.deleteMany(),
      Favorite.deleteMany()
    ]);

    // Create sample data with explicit IDs
    const destinationGuides = await DestinationGuide.create([
      {
        id: 1,
        title: 'Bali Destination Guide',
        summary: 'Explore the beauty of Bali with our comprehensive guide.',
        photos: ['photo_url1', 'photo_url2'],
        description: 'Detailed information about Bali...',
        reviews: [{
          user: 'user123',
          rating: 5,
          comment: 'Amazing guide!'
        }]
      },
      {
        id: 2,
        title: 'Paris Destination Guide',
        summary: 'Discover the magic of Paris...',
        photos: ['photo_url3', 'photo_url4'],
        description: 'Detailed information about Paris...',
        reviews: []
      }
    ]);

    const tripItinerary = await TripItinerary.create({
      id: 1,
      destination: 'Bali',
      duration: '7 days',
      activities: ['Surfing', 'Snorkeling'],
      lodging: 'luxury villa',
      dining: 'Local cuisine'
    });

    res.json({ 
      message: 'Database setup completed',
      destinationGuideIds: destinationGuides.map(g => g.id),
      itineraryId: tripItinerary.id
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};