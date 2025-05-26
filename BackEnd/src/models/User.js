import { Sequelize } from 'sequelize';
import sequelize from '../database.js';

class User extends Sequelize.Model {};

User.init({
  id: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: Sequelize.DataTypes.STRING,
  password:{
    type: Sequelize.DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  email: {
    type: Sequelize.DataTypes.STRING,
    unique: true,
    allowNull: false
  },permiso: {
    type: Sequelize.DataTypes.BOOLEAN,} 
  }, {
    sequelize,
    timestamps: true,
  },
 
  
);

export {User};