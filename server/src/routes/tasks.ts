import { Router } from "express";
import {
  getAllTasks,
  createTask,
  getSortedTasks,
  updateTask,
  deleteTask,
} from "../controllers/tasks";

const tasksRoute = Router();

tasksRoute.get("/", getAllTasks);
tasksRoute.post("/", createTask);
tasksRoute.get("/:sortedBy/:sortOrder", getSortedTasks);
tasksRoute.put("/:id", updateTask);
tasksRoute.delete("/:id", deleteTask);

export default tasksRoute;
