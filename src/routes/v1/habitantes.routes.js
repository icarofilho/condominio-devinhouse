import { Router } from "express";
import HabitantsController from "../../controllers/HabitantsController";
const habRoutes = Router();


habRoutes.get("/resident", HabitantsController.index);
habRoutes.get("/income", HabitantsController.income);
habRoutes.get("/residentby/", HabitantsController.showFiltered);
habRoutes.get("/resident/:id", HabitantsController.show);
habRoutes.get("/residentbyage/:age", HabitantsController.showByAge);
habRoutes.post("/resident", HabitantsController.store);
habRoutes.delete("/resident/:id", HabitantsController.destroy);

export default habRoutes;
