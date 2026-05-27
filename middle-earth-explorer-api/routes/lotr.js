const router = require('express').Router();
const lotr = require('../controllers/lotr');

router.get('/characters', lotr.getCharacters);

module.exports = router;