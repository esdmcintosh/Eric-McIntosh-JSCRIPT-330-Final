const express = require('express');

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

module.exports = app;