const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },

  itemType: {
    type: String,
    required: true
  },

  itemId: {
    type: String,
    required: true
  },

  name: {
    type: String,
    required: true
  }
});

favoriteSchema.index(
  { userId: 1, itemId: 1 },
  { unique: true }
);

module.exports = mongoose.model(
  'Favorite',
  favoriteSchema
);