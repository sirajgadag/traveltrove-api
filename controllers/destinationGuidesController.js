import DestinationGuide from '../models/DestinationGuide.js';

export const searchDestinationGuides = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: "Invalid search query" });

    const guides = await DestinationGuide.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { summary: { $regex: query, $options: 'i' } }
      ]
    }).lean();

    const formattedGuides = guides.map(guide => ({
      id: guide.id,
      title: guide.title,
      summary: guide.summary,
      photos: guide.photos
    }));

    res.json({ destinationGuides: formattedGuides });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDestinationGuide = async (req, res) => {
  try {
    const guide = await DestinationGuide.findOne({ id: req.params.id }).lean();
    if (!guide) return res.status(404).json({ error: "Destination guide not found" });

    res.json({
      id: guide.id,
      title: guide.title,
      description: guide.description,
      reviews: guide.reviews
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createDestinationGuide = async (req, res) => {
  try {
    const { title, summary, photos, description } = req.body;
    
    const newGuide = await DestinationGuide.create({
      title,
      summary,
      photos,
      description
    });

    res.status(201).json({
      message: "Destination guide created successfully",
      id: newGuide.id
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};