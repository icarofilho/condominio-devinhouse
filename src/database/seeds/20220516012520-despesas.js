"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "despesas",
      [
        {
          mes:1,
          ano:2022,
          agua:1700,
          luz:1500,
          reserva:1100,
          adm:2000,
          extra:300,
          total: 1700+1500+2000,
          caixa: 1100-300,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          mes:2,
          ano:2022,
          agua:1850,
          luz:1430,
          reserva:1150,
          adm:2000,
          extra:300,
          total: 1850+1430+2000,
          caixa: 1150-300,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          mes:3,
          ano:2022,
          agua:1625,
          luz:1733,
          reserva:1000,
          adm:2000,
          extra:300,
          total: 1625+1733+2000,
          caixa: 1000-300,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          mes:4,
          ano:2022,
          agua:1620,
          luz:1250,
          reserva:1000,
          adm:2000,
          extra:350,
          total: 1620+1250+2000,
          caixa: 1000-350,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          mes:5,
          ano:2022,
          agua:1670,
          luz:1550,
          reserva:1050,
          adm:2000,
          extra:300,
          total: 1670+1550+2000,
          caixa: 1050-300,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("despesas", null, {});
  },
};
