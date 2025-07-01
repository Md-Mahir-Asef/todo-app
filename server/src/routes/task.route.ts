import { Router } from "express";
import {
  createTask,
  getSortedTasks,
  updateTask,
  deleteTask,
} from "../controllers/task.controller";

const taskRoute = Router();

taskRoute.post("/", createTask);
taskRoute.get("/:sortedBy/:sortOrder", getSortedTasks);
taskRoute.put("/:id", updateTask);
taskRoute.delete("/:id", deleteTask);

export default taskRoute;
