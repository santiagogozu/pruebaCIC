const express = require('express');
const app = express();
const sequelize = require('./config/db');
const postRoutes = require('./routes/userRoutes');
require('dotenv').config();
const cors = require('cors');


app.use(express.json());
app.use(cors());
app.use('/api', postRoutes);

sequelize.authenticate()
  .then(() => {
    console.log('Conectado a la base de datos');
    app.listen(3000, () => {
      console.log('Servidor corriendo en http://localhost:3000');
    });
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });
