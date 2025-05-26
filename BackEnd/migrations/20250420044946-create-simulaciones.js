'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Simulaciones', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      dia: {
        type: Sequelize.INTEGER,
      },
      mes: {
        type: Sequelize.INTEGER,
      },
      año: {
        type: Sequelize.INTEGER,
      },
      plazo: {
        type: Sequelize.INTEGER,
      },
      taza: {
        type: Sequelize.INTEGER,
      },
      valorcredito: {
        type: Sequelize.FLOAT,
      },
      valorUF: {
        type: Sequelize.FLOAT,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Simulaciones');
  },
};
