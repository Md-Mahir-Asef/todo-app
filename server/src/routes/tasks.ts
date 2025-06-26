import { Router } from "express";
import { getAllTasks, createTask, getSortedTasks } from "../controllers/tasks";

const tasksRoute = Router();

tasksRoute.get("/", getAllTasks);
tasksRoute.post("/", createTask);
tasksRoute.get("/:sortedBy/:sortOrder", getSortedTasks);

export default tasksRoute;
