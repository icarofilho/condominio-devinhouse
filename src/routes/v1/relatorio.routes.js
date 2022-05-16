import { Router } from "express";
import RelatorioController from "../../controllers/RelatorioController";
const relRoutes = Router();

relRoutes.get("/", RelatorioController.index);


export default relRoutes;
