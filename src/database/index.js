import Sequelize from "sequelize";
import dbConfig from "../config/database";
import Habitante from "../models/Habitante";

class Database {
  constructor() {
    this.init();
  }
  init() {
    this.connection = new Sequelize(dbConfig);
    Habitante.init(this.connection);
  }
}

module.exports = new Database();
