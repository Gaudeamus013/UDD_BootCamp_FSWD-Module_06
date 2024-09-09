// controllers/userController.js

const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Controlador para crear un nuevo usuario
exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Genera un salt y hashea la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Crea el usuario en la base de datos
    const user = await User.create({ username, email, password: hashedPassword });
    res.status(201).json({ message: 'Usuario creado exitosamente', userId: user._id });
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el usuario', error: error.message });
  }
};

// Controlador para el inicio de sesión
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Busca el usuario por email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Usuario no existe' });
    }
    // Compara la contraseña proporcionada con la almacenada
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }
    // Genera un token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

// Controlador para verificar el token del usuario
exports.verifyToken = async (req, res) => {
  try {
    // Busca el usuario por ID (proporcionado por el middleware de autenticación)
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al verificar el token', error: error.message });
  }
};

// Controlador para actualizar la información del usuario
exports.updateUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const updates = {};
    if (username) updates.username = username;
    if (email) updates.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(password, salt);
    }
    // Actualiza el usuario y devuelve la versión actualizada
    const user = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
      runValidators: true,
      select: '-password'
    });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el usuario', error: error.message });
  }
};

// Controlador para obtener todos los usuarios (solo para propósitos administrativos)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los usuarios', error: error.message });
  }
};