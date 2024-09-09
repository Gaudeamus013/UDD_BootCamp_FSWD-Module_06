// controllers/noteController.js

const Note = require('../models/noteModel');

// Controlador para crear una nueva nota
exports.createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    // Crea una nueva nota asociada al usuario actual
    const newNote = await Note.create({ title, content, user: req.user.id });
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la nota', error: error.message });
  }
};

// Controlador para obtener todas las notas del usuario actual
exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las notas', error: error.message });
  }
};

// Controlador para obtener una nota específica por su ID
exports.getNoteById = async (req, res) => {
  try {
    // Busca la nota por ID y asegura que pertenezca al usuario actual
    const note = await Note.findOne({ _id: req.params.id, user: req.user.id });
    if (!note) {
      return res.status(404).json({ message: 'Nota no encontrada' });
    }
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la nota', error: error.message });
  }
};

// Controlador para actualizar una nota existente
exports.updateNoteById = async (req, res) => {
  try {
    // Actualiza la nota y devuelve la versión actualizada
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!note) {
      return res.status(404).json({ message: 'Nota no encontrada' });
    }
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la nota', error: error.message });
  }
};

// Controlador para eliminar una nota
exports.deleteNoteById = async (req, res) => {
  try {
    // Elimina la nota y verifica que pertenezca al usuario actual
    const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!note) {
      return res.status(404).json({ message: 'Nota no encontrada' });
    }
    res.json({ message: 'Nota eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la nota', error: error.message });
  }
};