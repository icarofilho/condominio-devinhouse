import { DataTypes, Model } from "sequelize";
// const { Model, DataTypes } = require("sequelize");

class Despesa extends Model {
  static init(sequelize) {
    super.init(
      {
        mes: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        ano: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        agua: {
          type: DataTypes.FLOAT,
          // defaultValue: 800,
        },
        luz: {
          type: DataTypes.FLOAT,
          // defaultValue: 1500,
          allowNull: false,
        },
        reserva: {
          type: DataTypes.FLOAT,
          // defaultValue: 150,
        },
        adm: {
          type: DataTypes.FLOAT,
          // defaultValue: 250,
        },
        total: {
          type: DataTypes.FLOAT,
        },
      },
      {
        sequelize,
        modelName: "Despesa",
        tableName: "despesas",
        timestamps: true,
        underscored: true,
        underscoredAll: true,
      }
    );
  }
}

module.exports = Despesa;
