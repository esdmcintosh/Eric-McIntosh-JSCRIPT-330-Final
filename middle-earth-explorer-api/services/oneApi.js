const axios = require('axios');

const api = axios.create({
  baseURL: 'https://the-one-api.dev/v2',
  headers: {
    Authorization: `Bearer ${process.env.ONE_API_KEY}`
  }
});

module.exports = api;