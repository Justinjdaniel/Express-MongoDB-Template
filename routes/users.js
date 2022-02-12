const router = require('express').Router();
const {
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/userController');
const { authenticator } = require('../middleware/authenticator');

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', authenticator, getMe);

module.exports = router;
