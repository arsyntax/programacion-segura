import { Sequelize } from 'sequelize';
import sequelize from '../database.js';

class Prestamo extends Sequelize.Model {};

Prestamo.init({

  id: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  rut: {
    type: Sequelize.DataTypes.INTEGER,
  },
  correo: {
    type: Sequelize.DataTypes.STRING,
  },
  ejecutivo: {
    type: Sequelize.DataTypes.STRING,
  },
  nombre: {
    type: Sequelize.DataTypes.STRING,
  },
  valor:{
    type: Sequelize.DataTypes.FLOAT,
  },
  razon: {
    type: Sequelize.DataTypes.STRING,
  },
  numMes: {
    type: Sequelize.DataTypes.INTEGER,
  },

  day: {
    type: Sequelize.DataTypes.INTEGER,
  },
  month: { 
    type:Sequelize.DataTypes.INTEGER
  },

  year:{
    type: Sequelize.DataTypes.INTEGER,
  }}, {
    sequelize,
    timestamps: true,
  },  
  
);

export {Prestamo};