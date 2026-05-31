const router = require('express').Router();

const reviews = require('../controllers/reviews');
const auth = require('../middleware/auth');

router.get('/', reviews.getAll);
router.get('/search', reviews.search);
router.get('/:id', reviews.getOne);

router.post('/', auth, reviews.create);
router.put('/:id', auth, reviews.update);
router.delete('/:id', auth, reviews.remove);

module.exports = router;