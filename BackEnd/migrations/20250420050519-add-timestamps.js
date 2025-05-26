'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Simulaciones', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    });

    await queryInterface.changeColumn('Simulaciones', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    });

    await queryInterface.changeColumn('Prestamos', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    });

    await queryInterface.changeColumn('Prestamos', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Simulaciones', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
    });

    await queryInterface.changeColumn('Simulaciones', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
    });

    await queryInterface.changeColumn('Prestamos', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
    });

    await queryInterface.changeColumn('Prestamos', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },
};
