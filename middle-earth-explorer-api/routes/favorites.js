const router = require('express').Router();
const favorites = require('../controllers/favorites');

router.get('/', favorites.getAll);

module.exports = router;