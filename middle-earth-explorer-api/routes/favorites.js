const router = require('express').Router();

const favorites = require('../controllers/favorites');
const auth = require('../middleware/auth');

router.use(auth);

router.get('/', favorites.getAll);
router.get('/:id', favorites.getOne);
router.post('/', favorites.create);
router.put('/:id', favorites.update);
router.delete('/:id', favorites.remove);

module.exports = router;