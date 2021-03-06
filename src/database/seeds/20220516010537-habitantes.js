'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("habitantes", [
      {
        nome: "João",
        sobrenome: "Silva",
        data_nascimento: "01/01/2000",
        renda: 1000,
        cpf: "61567731341",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nome: "Maria",
        sobrenome: "Souza Vogas",
        data_nascimento: "01/04/1962",
        renda: 4500,
        cpf: "17725835377",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nome: "Adriana",
        sobrenome: "Santos",
        data_nascimento: "01/01/2000",
        renda: 3900,
        cpf: "12345678911",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nome: "Myrian",
        sobrenome: "Campelo Elias",
        data_nascimento: "27/03/1949",
        renda: 2500,
        cpf: "58156241959",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nome: "Isadora",
        sobrenome: "Pessoa da Paixão",
        data_nascimento: "19/06/1974",
        renda: 6750,
        cpf: "33782682203",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nome: "Kevin",
        sobrenome: "Inácio Sousa",
        data_nascimento: "26/11/1997",
        renda: 4980,
        cpf: "78430710086",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nome: "Rodrigo",
        sobrenome: "Valansuela Cretella",
        data_nascimento: "11/12/1954",
        renda: 7800,
        cpf: "52244534960",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nome: "Enzo",
        sobrenome: "Milanez Valente",
        data_nascimento: "16/01/1999",
        renda: 4600,
        cpf: "83267142679",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nome: "Clevisson",
        sobrenome: "Peçanha Moura",
        data_nascimento: "17/01/1941",
        renda: 8900,
        cpf: "76777119280",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nome: "Nilce",
        sobrenome: "Sena Nepomuceno",
        data_nascimento: "15/08/2002",
        renda: 2200,
        cpf: "24712271124",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nome: "Alda",
        sobrenome: "Donato Fontes",
        data_nascimento: "18/08/1982",
        renda: 5800,
        cpf: "75508467238",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nome: "Jocilea",
        sobrenome: "Amorim Teodoro",
        data_nascimento: "29/01/1965",
        renda: 3700,
        cpf: "73758273200",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nome: "Mateus",
        sobrenome: "Malaquias Heizelmann",
        data_nascimento: "14/09/1989",
        renda: 5500,
        cpf: "33928461630",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('habitantes', null, {})
  }
};
