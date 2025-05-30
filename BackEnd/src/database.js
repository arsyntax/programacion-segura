import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Inicializar las configuraciones del archivo .env
dotenv.config();

// Inicializar Sequelize para conectarse a la BD
const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: true,
});

// Bloquear el programa hasta establecer la conexión con la DB
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión exitosa a la base de datos.');
  } catch (error) {
    console.error('Error de conexión a la base de datos:', error.message);
  }
})();

export default sequelize;
