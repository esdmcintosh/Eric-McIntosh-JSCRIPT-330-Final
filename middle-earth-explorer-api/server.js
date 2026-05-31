// require('dotenv').config();

// const express = require('express');
// const mongoose = require('mongoose');

// const authRoutes = require('./routes/auth');
// const favoriteRoutes = require('./routes/favorites');
// const reviewRoutes = require('./routes/reviews');
// const lotrRoutes = require('./routes/lotr');

// const app = express();

// app.use(express.json());


// app.use('/auth', authRoutes);
// app.use('/favorites', favoriteRoutes);
// app.use('/reviews', reviewRoutes);
// app.use('/lotr', lotrRoutes);

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log('MongoDB connected'))
//   .catch((err) => console.log(err));

// const PORT = process.env.PORT || 3000;

// if (process.env.NODE_ENV !== 'test') {
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// }


// app.get('/', (req, res) => {
//   res.send('Middle-earth Explorer API running');
// });

// if (process.env.NODE_ENV !== 'test') {
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// }

// module.exports = app;

require('dotenv').config();

const mongoose = require('mongoose');

const app = require('./app');

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');

    app.listen(PORT, () => {
      console.log(
        `Server running on port ${PORT}`
      );
    });
  })
  .catch((err) => {
    console.error(err);
  });