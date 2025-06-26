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
    res.status(200).json(tasks);
  } catch (err) {
    logger.error("Failed to get all tasks", {
      action: "READ",
      entity: "Task",
      error: err,
    });
    res.status(500).json({
      message: "Failed to get all tasks.",
      error: err instanceof Error ? err.message : "Unknown Error Occured.",
    });
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
    res.status(200).json(newTask);
  } catch (err) {
    logger.error("Failed to create Task", {
      action: "CREATE",
      entity: "Task",
      reqestBody: {
        taskId: req.body.id,
        taskTitle: req.body.title,
      },

      error: err,
    });
    res.status(500).json({
      message: "Failed to create a task.",
      error: err instanceof Error ? err.message : "Unknown Error Occured.",
    });
  }
};

export const getSortedTasks = async (req: Request, res: Response) => {
  try {
    const sortedBy = req.params.sortedBy;
    const sortOrder = req.params.sortOrder;
    const tasks = await prisma.tasks.findMany({
      orderBy: {
        [sortedBy]: sortOrder,
      },
    });
    logger.info("Found sorted tasks.", {
      action: "READ",
      entity: "Task",
      arrLen: tasks.length,
    });
    res.status(200).json(tasks);
  } catch (err) {
    const error = err instanceof Error ? err.message : "Unknown Error Occured.";
    logger.error("Failed to get sorted tasks.", {
      action: "READ",
      entity: "Task",
      error,
    });
  }
};
