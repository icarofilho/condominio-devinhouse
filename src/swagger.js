const swaggerAutogen = require("swagger-autogen")();
const outputFile = "./src/swagger_output.json";
const endPointsFiles = ["src/routes/index.js"];

const doc = {
  swagger: "3.0",
  info: {
    version: "1.0.0",
    title: "Condominio Dev",
    description:
      "Backend para o condominio da empresa Dev, com o intuito de facilitar a visualização de gastos.",
  },
  host: "localhost:3333",
  basePath: "/",
  schemes: ["http"],
  consumes: ["application/json", "application/xml"],
  produces: ["application/json"],
  tags: [
    {
      name: "Habitantes-extra",
      description: "EndPoint dos CRUDs de Habitantes",
    },
    {
      name: "Habitantes-solicitado",
      description: "EndPoint dos CRUDs de Habitantes",
    },
    {
      name: "Condominio-extra",
      description: "EndPoint dos testes do gastos do condominio",
    },
    {
      name: "Relatorio-solicitado",
      description: "Exibe um relatorio com os gastos do condominio",
    },
  ],
};

swaggerAutogen(outputFile, endPointsFiles, doc);
