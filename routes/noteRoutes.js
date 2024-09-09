const express = require('express');
const router = express.Router();
const { createNote, getNotes, getNoteById, updateNote, deleteNote } = require('../controllers/noteController');
const { protect } = require('../middleware/authMiddleware');

router.post('/create', protect, createNote);
router.get('/readall', protect, getNotes);
router.get('/readone/:id', protect, getNoteById);
router.put('/update/:id', protect, updateNote);
router.delete('/delete/:id', protect, deleteNote);

module.exports = router;