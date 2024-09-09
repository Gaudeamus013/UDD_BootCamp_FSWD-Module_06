// server.js

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoutes');

require('dotenv').config();

const app = express();

// Middleware
app.use(cors());  // Habilita CORS para todas las rutas
app.use(express.json());  // Parsea el cuerpo de las solicitudes JSON

// Conecta a la base de datos
connectDB();

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 5000;

// Inicia el servidor
app.listen(PORT, () => console.log(`Servidor ejecutándose en el puerto ${PORT}`));