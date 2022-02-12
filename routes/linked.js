const router = require('express').Router();
const {
  getLinked,
  setLinked,
  updateLinked,
  deleteLinked,
} = require('../controllers/linkedController');
const { authenticator } = require('../middleware/authenticator');

router.route('/').get(authenticator, getLinked).post(authenticator, setLinked);
router.route('/:id').delete(authenticator, deleteLinked).put(authenticator, updateLinked);

module.exports = router;
