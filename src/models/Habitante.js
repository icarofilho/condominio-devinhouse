import { DataTypes, Model } from 'sequelize';
// const { Model, DataTypes } = require("sequelize");


class Habitante extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        sobrenome: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        data_nascimento: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        renda: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        cpf: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
        modelName: "Habitante",
        tableName: "habitantes",
        timestamps: true,
        underscored: true,
        underscoredAll: true,
      }
    );
  }
}

module.exports = Habitante;
