import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: String,
  itemId: mongoose.Schema.Types.ObjectId
});

export default mongoose.model('Favorite', favoriteSchema);