import { Router } from "express";

import habRoutes from "./v1/habitantes.routes";
import despRoutes from "./v1/despesas.routes";

const router = Router();

router.use("/hab", habRoutes);
router.use("/desp", despRoutes);

export default router;
