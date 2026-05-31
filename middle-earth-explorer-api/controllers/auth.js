const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const {
      username,
      email,
      password
    } = req.body;

    const existingUser =
      await User.findOne({
        $or: [
          { email },
          { username }
        ]
      });

    if (existingUser) {
      return res.status(400).json({
        error:
          'User already exists'
      });
    }

    const passwordHash =
      await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      passwordHash
    });

    res.status(201).json({
      id: user._id,
      username: user.username,
      email: user.email
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

exports.login = async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;

    const user =
      await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        error: 'Invalid credentials'
      });
    }

    const validPassword =
      await bcrypt.compare(
        password,
        user.passwordHash
      );

    if (!validPassword) {
      return res.status(401).json({
        error: 'Invalid credentials'
      });
    }

    const token = jwt.sign(
      {
        id: user._id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d'
      }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};
