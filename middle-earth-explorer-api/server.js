require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

app.get('/', (req, res) => {
  res.send('Middle-earth Explorer API running');
});

const authRoutes = require('./routes/auth');
const favoriteRoutes = require('./routes/favorites');
const reviewRoutes = require('./routes/reviews');
const lotrRoutes = require('./routes/lotr');

const app = express();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/favorites', favoriteRoutes);
app.use('/reviews', reviewRoutes);
app.use('/lotr', lotrRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;