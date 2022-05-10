import { Router } from "express";

import habRoutes from "./v1/habitantes.routes";

const router = Router();

router.use("/hab", habRoutes);

export default router;
