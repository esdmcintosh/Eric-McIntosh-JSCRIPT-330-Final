const Favorite = require('../models/Favorite');

exports.getAll = async (req, res) => {
  try {
    const favorites = await Favorite.find({
      userId: req.user.id
    });

    res.json(favorites);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

exports.getOne = async (req, res) => {
  try {
    const favorite = await Favorite.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!favorite) {
      return res.status(404).json({
        error: 'Favorite not found'
      });
    }

    res.json(favorite);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

exports.create = async (req, res) => {
  try {
    const favorite = await Favorite.create({
      ...req.body,
      userId: req.user.id
    });

    res.status(201).json(favorite);
  } catch (err) {
    res.status(400).json({
      error: err.message
    });
  }
};

exports.update = async (req, res) => {
  try {
    const favorite = await Favorite.findOneAndUpdate(
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

    if (!favorite) {
      return res.status(404).json({
        error: 'Favorite not found'
      });
    }

    res.json(favorite);
  } catch (err) {
    res.status(400).json({
      error: err.message
    });
  }
};

exports.remove = async (req, res) => {
  try {
    const favorite = await Favorite.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!favorite) {
      return res.status(404).json({
        error: 'Favorite not found'
      });
    }

    res.json({
      message: 'Favorite deleted'
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};