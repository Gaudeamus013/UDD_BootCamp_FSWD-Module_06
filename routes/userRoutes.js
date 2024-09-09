// routes/userRoutes.js

const express = require('express');
const { createUser, login, verifyToken, updateUser, getAllUsers } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Define las rutas para las operaciones relacionadas con usuarios
router.post('/register', createUser);
router.post('/login', login);
router.get('/verify', protect, verifyToken);
router.put('/update', protect, updateUser);
router.get('/', protect, getAllUsers);

module.exports = router;