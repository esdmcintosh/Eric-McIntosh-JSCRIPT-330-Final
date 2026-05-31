const Review = require('../models/Review');

exports.getAll = async (req, res) => {
  try {
    const reviews = await Review.find();

    res.json(reviews);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

exports.getOne = async (req, res) => {
  try {
    const review = await Review.findById(
      req.params.id
    );

    if (!review) {
      return res.status(404).json({
        error: 'Review not found'
      });
    }

    res.json(review);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

exports.create = async (req, res) => {
  try {
    const review = await Review.create({
      ...req.body,
      userId: req.user.id
    });

    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({
      error: err.message
    });
  }
};

exports.update = async (req, res) => {
  try {
    const review = await Review.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id
      },
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!review) {
      return res.status(404).json({
        error: 'Review not found'
      });
    }

    res.json(review);
  } catch (err) {
    res.status(400).json({
      error: err.message
    });
  }
};

exports.remove = async (req, res) => {
  try {
    const review = await Review.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!review) {
      return res.status(404).json({
        error: 'Review not found'
      });
    }

    res.json({
      message: 'Review deleted'
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

exports.search = async (req, res) => {
  try {
    const results = await Review.find({
      $text: {
        $search: req.query.q
      }
    });

    res.json(results);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};