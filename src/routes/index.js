import { Router } from "express";

import habRoutes from "./v1/habitantes.routes";
import despRoutes from "./v1/despesas.routes";
import relRoutes from "./v1/relatorio.routes";

const router = Router();

router.use("/hab", habRoutes);
router.use("/desp", despRoutes);
router.use("/relatorio", relRoutes);

export default router;
