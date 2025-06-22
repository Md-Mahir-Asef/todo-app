import { Router } from "express";
import tasksRoute from "./tasks";

const router = Router();

router.use("/tasks", tasksRoute);

export default router;