const api = require('../services/oneApi');

exports.getCharacters = async (req, res) => {
  try {
    const response = await api.get('/character');

    res.json(response.data);
  } catch (err) {
    res.status(500).json({
      error: 'External API error'
    });
  }
};

exports.getMovies = async (req, res) => {
  try {
    const response = await api.get('/movie');

    res.json(response.data);
  } catch (err) {
    res.status(500).json({
      error: 'External API error'
    });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const response = await api.get('/book');

    res.json(response.data);
  } catch (err) {
    res.status(500).json({
      error: 'External API error'
    });
  }
};

exports.getQuotes = async (req, res) => {
  try {
    const response = await api.get('/quote');

    res.json(response.data);
  } catch (err) {
    res.status(500).json({
      error: 'External API error'
    });
  }
};