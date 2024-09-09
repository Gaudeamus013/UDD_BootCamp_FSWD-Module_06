// config/database.js

const mongoose = require('mongoose');

// Función asíncrona para conectar a la base de datos MongoDB
const connectDB = async () => {
  try {
    // Intenta conectar a la base de datos usando la URI proporcionada en las variables de entorno
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conectado a la BD de MongoDB');
  } catch (error) {
    // Si hay un error en la conexión, lo muestra en la consola y termina el proceso
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;