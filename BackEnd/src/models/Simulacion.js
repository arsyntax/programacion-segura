import { Sequelize } from 'sequelize';
import sequelize from '../database.js';

class Simulaciones extends Sequelize.Model {};

Simulaciones.init({

  id: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  dia: {
    type: Sequelize.DataTypes.INTEGER,
  },
  mes: Sequelize.DataTypes.INTEGER,
  año:{
    type: Sequelize.DataTypes.INTEGER,
  },
  plazo: {
    type: Sequelize.DataTypes.INTEGER,
  },
  taza: {
    type: Sequelize.DataTypes.INTEGER,
  },
  valorcredito: {
    type: Sequelize.DataTypes.FLOAT,
  },
  valorUF: {
    type: Sequelize.DataTypes.FLOAT,
    }}, {
    sequelize,
    timestamps: true,
  },  
  
);

export {Simulaciones};