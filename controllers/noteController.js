const Note = require('../models/noteModel');

exports.createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = await Note.create({ title, content, user: req.user.id });
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la nota', error: error.message });
  }
};

exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las notas', error: error.message });
  }
};

exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user.id });
    if (!note) {
      return res.status(404).json({ message: 'Nota no encontrada' });
    }
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la nota', error: error.message });
  }
};

exports.updateNoteById = async (req, res) => {
  try {
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

exports.deleteNoteById = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!note) {
      return res.status(404).json({ message: 'Nota no encontrada' });
    }
    res.json({ message: 'Nota eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la nota', error: error.message });
  }
};