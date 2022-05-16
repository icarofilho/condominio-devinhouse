"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("despesas", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      mes: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      ano: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      agua: {
        type: Sequelize.FLOAT,
        // defaultValue: 800,
      },
      luz: {
        type: Sequelize.FLOAT,
        // defaultValue: 1500,
        allowNull: false,
      },
      reserva: {
        type: Sequelize.FLOAT,
        // defaultValue: 150,
      },
      adm: {
        type: Sequelize.FLOAT,
        // defaultValue: 250,
      },
      extra:{
        type: Sequelize.FLOAT,
      },
      total:{
        type: Sequelize.FLOAT,
      },
      caixa:{
        type: Sequelize.FLOAT,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("despesas");
  },
};
