// models/userModel.js

const mongoose = require('mongoose');

// Define el esquema para los usuarios
const userSchema = new mongoose.Schema(
  {
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  image: {
    type: String
  }
},
{
  timestamps: true  // Agrega campos createdAt y updatedAt automáticamente
}
);

const User = mongoose.model('User', userSchema);

module.exports = User;