import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { TaskType } from "../types/tasks.type";

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await prisma.tasks.findMany();
    res.json(tasks);
  } catch (err) {
    res.json(err);
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, priority, dueDate, status }: TaskType =
      req.body;
    const newTask = await prisma.tasks.create({
      data: {
        title,
        description,
        priority,
        dueDate,
        status,
      },
    });
    res.json(newTask);
  } catch (err) {
    res.json(err);
  }
};
