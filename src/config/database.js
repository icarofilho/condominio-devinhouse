require("dotenv").config();
const PostgresConnectionStringParser = require("pg-connection-string");

const databaseUrl = process.env.DATABASE_URL;
const connectionOptions = PostgresConnectionStringParser.parse(databaseUrl);

module.exports = {
  dialect: "postgres",
  host: connectionOptions.host,
  username: connectionOptions.user,
  password: connectionOptions.password,
  database: connectionOptions.database,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
