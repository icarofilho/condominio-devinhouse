import { Router } from "express";
import DespesasController from "../../controllers/DespesasController";
const despRoutes = Router();

despRoutes.get("/index", DespesasController.index);
despRoutes.post("/store", DespesasController.store);
despRoutes.get("/gasto_total", DespesasController.gastoTotal);


export default despRoutes;
