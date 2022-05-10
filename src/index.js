import "./database";
import express from "express";

import router from "./routes";

const App = express();

App.use(express.json());
App.use(router);

export default App;
