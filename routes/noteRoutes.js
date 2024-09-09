// routes/noteRoutes.js

const express = require('express');
const { createNote, getAllNotes, getNoteById, updateNoteById, deleteNoteById } = require('../controllers/noteController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Aplica el middleware de autenticación a todas las rutas de notas
router.use(protect);

// Define las rutas para las operaciones CRUD de notas
router.post('/', createNote);
router.get('/', getAllNotes);
router.get('/:id', getNoteById);
router.put('/:id', updateNoteById);
router.delete('/:id', deleteNoteById);

module.exports = router;