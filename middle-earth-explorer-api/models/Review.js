const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  title: String,
  content: String,
  rating: Number
});

reviewSchema.index({
  title: 'text',
  content: 'text'
});

module.exports = mongoose.model('Review', reviewSchema);