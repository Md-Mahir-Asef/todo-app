import { Router } from "express";
import { getAllTasks, createTask } from "../controllers/tasks.controller";

const tasksRoute = Router();

tasksRoute.get("/", getAllTasks);
tasksRoute.post("/", createTask);

export default tasksRoute;