import mongoose from 'mongoose';

const tripItinerarySchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  destination: String,
  duration: String,
  activities: [String],
  lodging: String,
  dining: String
});

tripItinerarySchema.pre('save', async function (next) {
  if (!this.isNew) return next();

  try {
    const lastItinerary = await this.constructor.findOne().sort({ id: -1 });
    this.id = lastItinerary ? lastItinerary.id + 1 : 1;
    next();
  } catch (err) {
    next(err);
  }
});

export default mongoose.model('TripItinerary', tripItinerarySchema);