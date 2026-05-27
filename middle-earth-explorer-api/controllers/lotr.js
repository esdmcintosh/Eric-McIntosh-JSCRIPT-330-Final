const api = require('../services/oneApi');

exports.getCharacters = async (req, res) => {
  try {
    const response = await api.get('/character');
    res.json(response.data);
  } catch (err) {
    res.status(500).json(err.message);
  }
};