'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Prestamos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      rut: {
        type: Sequelize.INTEGER
      },
      correo: {
        type: Sequelize.STRING
      },
      ejecutivo: {
        type: Sequelize.STRING
      },
      nombre: {
        type: Sequelize.STRING
      },
      valor: {
        type: Sequelize.FLOAT
      },
      razon: {
        type: Sequelize.STRING
      },
      numMes: {
        type: Sequelize.INTEGER
      },
      day: {
        type: Sequelize.INTEGER
      },
      month: {
        type: Sequelize.INTEGER
      },
      year: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Prestamos');
  }
};
