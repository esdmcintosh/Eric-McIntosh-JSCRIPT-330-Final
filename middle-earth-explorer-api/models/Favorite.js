const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  itemType: String,
  itemId: String,
  name: String
});

favoriteSchema.index({ userId: 1, itemId: 1 }, { unique: true });

module.exports = mongoose.model('Favorite', favoriteSchema);