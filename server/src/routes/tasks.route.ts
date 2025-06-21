import { Router } from "express";
import { Request, Response } from "express";
import { getAllTasks } from "../controllers/tasks.controller";

const tasksRoute = Router();

tasksRoute.get("/", getAllTasks);

export default tasksRoute;