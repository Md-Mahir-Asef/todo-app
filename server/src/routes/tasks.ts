import { Router } from "express";
import { getAllTasks, createTask } from "../controllers/tasks";

const tasksRoute = Router();

tasksRoute.get("/", getAllTasks);
tasksRoute.post("/", createTask);

export default tasksRoute;