import "./database";
import express from "express";
import cors from 'cors'
import morgan from './config/morgan'
import router from "./routes";
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger_output.json");


const App = express();

App.use(cors())
App.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
App.use(express.json());
App.use(morgan)
App.use(router);

export default App;
