import { Request, Response } from "express";
import prisma from "../utils/prisma";
import { TaskType } from "../utils/types/tasks";
import logger from "../utils/logger";

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await prisma.tasks.findMany();
    logger.info("Got all tasks", {
      action: "READ",
      entity: "Task",
      arrLen: tasks.length,
    });
    res.json(tasks);
  } catch (err) {
    logger.error("Failed to get all tasks", {
      aciton: "READ",
      entity: "Task",
      error: err,
    });
    res.json(err);
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, priority, dueDate, status }: TaskType =
      req.body;
    var newDueDate: string | undefined;
    if (dueDate) {
      newDueDate = new Date(dueDate).toISOString();
    }
    const data = {
      title,
      description,
      priority,
      dueDate: newDueDate,
      status,
    };
    const newTask = await prisma.tasks.create({
      data,
    });
    logger.info(`Created a Task`, {
      action: "CREATE",
      entity: "Task",
      taskId: newTask.id,
      taskTitle: newTask.title,
    });
    res.json(newTask);
  } catch (err) {
    res.json(err);
    logger.error("Failed to create Task", {
      action: "CREATE",
      entity: "Task",
      reqestBody: {
        taskId: req.body.id,
        taskTitle: req.body.title,
      },

      error: err,
    });
  }
};
