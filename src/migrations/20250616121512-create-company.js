'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('companies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      info: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING
      },
      openings: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      officeId: {
        type: Sequelize.INTEGER
      },
      openingId: {
        type: Sequelize.INTEGER
      },
      roleId: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('companies');
  }
};