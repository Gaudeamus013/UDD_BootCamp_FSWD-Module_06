const express = require('express');
const router = express.Router();
const { registerUser, loginUser, verifyToken, updateUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/verifytoken', protect, verifyToken);
router.put('/update', protect, updateUser);

module.exports = router;