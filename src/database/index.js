import Sequelize from "sequelize";
import dbConfig from "../config/database";
import Habitante from "../models/Habitante";
import Despesa from "../models/Despesa";

class Database {
  constructor() {
    this.init();
  }
  init() {
    this.connection = new Sequelize(dbConfig);
    Habitante.init(this.connection);
    Despesa.init(this.connection);
  }
}
module.exports = new Database();

// const connection = new Sequelize(dbConfig);
// Habitante.init(connection);
// Despesa.init(connection);
// module.exports = connection;



