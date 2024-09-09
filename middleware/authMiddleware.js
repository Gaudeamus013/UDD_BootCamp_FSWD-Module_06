// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Middleware para proteger rutas que requieren autenticación
exports.protect = async (req, res, next) => {
  try {
    let token;
    // Verifica si el token está en el encabezado de autorización
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
      return res.status(401).json({ message: 'No autorizado, token no proporcionado' });
    }
    // Verifica y decodifica el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Busca el usuario correspondiente al token y lo adjunta a la solicitud
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (error) {
    res.status(401).json({ message: 'No autorizado, token inválido' });
  }
};