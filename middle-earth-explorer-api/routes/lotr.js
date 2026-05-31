const router = require('express').Router();

const lotr = require('../controllers/lotr');

router.get('/characters', lotr.getCharacters);
router.get('/movies', lotr.getMovies);
router.get('/books', lotr.getBooks);
router.get('/quotes', lotr.getQuotes);

module.exports = router;