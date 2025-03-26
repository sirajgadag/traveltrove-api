import mongoose from 'mongoose';

const destinationGuideSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  title: String,
  summary: String,
  photos: [String],
  description: String,
  reviews: [{
    user: String,
    rating: Number,
    comment: String
  }]
});

destinationGuideSchema.pre('save', async function (next) {
  if (!this.isNew) return next();

  try {
    const lastGuide = await this.constructor.findOne().sort({ id: -1 });
    this.id = lastGuide ? lastGuide.id + 1 : 1;
    next();
  } catch (err) {
    next(err);
  }
});

export default mongoose.model('DestinationGuide', destinationGuideSchema);