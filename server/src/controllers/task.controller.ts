import { Response } from "express";
import prisma from "../utils/prisma";
import logger from "../utils/logger";
import { AuthenticatedRequest } from "../utils/types/user";
import { TaskDataSchema } from "../utils/zodSchemas";
import { ZodError } from "zod/v4";

export const createTask = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const reqBody = TaskDataSchema.parse(req.body);
    const { title, description, priority, dueDate, status } = reqBody;
    var newDueDate: string | null;
    if (dueDate) {
      newDueDate = new Date(dueDate).toISOString();
    } else {
      newDueDate = null;
    }
    if (!req.user) {
      throw new Error("Unauthenticated.");
    }
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        priority,
        dueDate: newDueDate,
        status,
        userId: req.user.id,
      },
    });
    logger.info(`CREATED TASK ${newTask.id} .`, {
      action: "CREATE",
      entity: "Task",
      taskTitle: newTask.title,
    });
    res.status(200).json({
      message: "New task created successfully",
      data: {
        task: newTask,
      },
      success: true,
    });
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
      success: false,
    });
  }
};

export const getSortedTasks = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const user = req.user;
    const sortedBy = req.params.sortedBy ?? "createdAt";
    const sortOrder = req.params.sortOrder ?? "desc";

    const tasks = await prisma.task.findMany({
      where: {
        userId: user?.id,
      },
      orderBy: {
        [sortedBy]: sortOrder,
      },
    });
    logger.info(`Found sorted tasks for user ${user?.id}.`, {
      action: "READ",
      entity: "Task",
      arrLen: tasks.length,
    });
    res.status(200).json({
      message: "Fount sorted tasks successfully.",
      data: {
        tasks,
      },
      success: true,
    });
  } catch (err) {
    const error = err instanceof Error ? err.message : "Unknown Error Occured.";
    logger.error(`Failed to get sorted tasks.`, {
      action: "READ",
      entity: "Task",
      error,
    });
    res.status(500).json({
      message: "Failed to get sorted tasks",
      success: false,
    });
  }
};

export const updateTask = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const id = req.params.id;
    const reqBody = TaskDataSchema.parse(req.body);
    const { title, description, priority, dueDate, status } = reqBody;
    var newDueDate: string | null;
    if (dueDate) {
      newDueDate = new Date(dueDate).toISOString();
    } else {
      newDueDate = null;
    }
    const updatedTask = await prisma.task.update({
      where: {
        id: id,
      },
      data: {
        title,
        description,
        priority,
        dueDate: newDueDate,
        status,
        userId: req.user?.id,
      },
    });
    logger.info(`Updated Task ${updatedTask.id} .`, {
      action: "UPDATE",
      entity: "Task",
      taskTitle: updatedTask.title,
    });
    res.status(200).json({
      message: "Task updated successfully.",
      success: true,
      data: {
        task: updatedTask,
      },
    });
  } catch (err) {
    logger.error("Failed to update task.", {
      action: "UPDATE",
      entity: "Task",
      id: req.params.id,
      error: err,
    });
    if (err instanceof ZodError) {
      res.status(400).json({
        message: "Invalid Information",
        error: err.message,
        success: false,
      });
    }
    res.status(500).json({
      message: "Failed to update task.",
      error: err instanceof Error ? err.message : "Unknown Error Occured.",
      success: false,
    });
  }
};

export const deleteTask = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const id = req.params.id;
    const deletedTask = await prisma.task.delete({
      where: {
        id,
      },
    });
    logger.info(`Task ${deletedTask.id} is Deleted by user ${req.user?.id} `, {
      action: "DELETE",
      entity: "Task",
      id: deletedTask.id,
      title: deletedTask.title,
    });
    res.status(200).json({
      message: "Task deleted successfully.",
      success: true,
      data: {
        task: deletedTask,
      },
    });
  } catch (err) {
    logger.error("Failed to DELETE task.", {
      action: "DELETE",
      entity: "Task",
      id: req.params.id,
      error: err,
    });
    res.status(500).json({
      message: "Failed to DELETE task.",
      error: err instanceof Error ? err.message : "Unknown Error Occured.",
      success: false,
    });
  }
};
