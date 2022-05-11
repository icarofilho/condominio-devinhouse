import "./database";
import express from "express";
import morgan from './config/morgan'
import router from "./routes";
// import morgan from 'morgan'
const App = express();

App.use(express.json());
App.use(morgan)
App.use(router);

export default App;
