// models/noteModel.js

const mongoose = require('mongoose');

// Define el esquema para las notas
const noteSchema = new mongoose.Schema(
  {
  title: { 
    type: String,
    required: true
  },
  content: { 
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
},
{
  timestamps: true  // Agrega campos createdAt y updatedAt automáticamente
}
);

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;