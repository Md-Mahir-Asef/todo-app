import { Request, Response } from "express";
import prisma from "../utils/prisma";
import logger from "../utils/logger";
import { User } from "../generated/prisma";
import { hasher } from "../utils/hasher";
import { generateToken } from "../utils/token";
import { compareSync } from "bcrypt";
import { AuthenticatedRequest } from "../utils/types/user";

export const signUp = async (req: Request, res: Response) => {
  try {
    const { name, email, password }: User = req.body;
    const hashedPass = hasher(password);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPass,
        tasks: {
          create: {
            title: "Welcome to Todo App.",
            description:
              "You can manage your tasks and boost your productivity through this app.",
            priority: "High",
            status: "Done",
            dueDate: new Date(Date.now()).toISOString(),
          },
        },
      },
    });
    const token = generateToken({
      id: newUser.id,
    });
    logger.info(`Created a new user ${newUser.id} and Signed Up .`, {
      action: "CREATE",
      entity: "User",
      userName: newUser.name,
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: "lax",
    });
    res.status(200).json({
      message: "Signed Up Successfully",
      success: true,
      data: {
        token: token,
      },
    });
  } catch (err) {
    logger.error("Failed to create Task", {
      action: "CREATE",
      entity: "User",
      reqestBody: {
        userName: req.body.name,
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

export const logOut = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    logger.info(`User ${userId} successfully logged out.`);
    res.status(200).json({
      message: "Log Out successful",
      success: true,
    });
  } catch (error) {
    logger.error("Log Out Failed", {
      action: "LOGOUT",
      entity: "User",
      error,
    });
    res.status(500).json({
      message: "Logout Failed!",
      error: error,
      success: false,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await prisma.task.deleteMany({
      where: {
        userId: id,
      },
    });
    const deletedUser = await prisma.user.delete({
      where: {
        id,
      },
    });
    logger.info(`Delete User ${deletedUser.id}`, {
      action: "DELETE",
      entity: "User",
      id: deletedUser.id,
      name: deletedUser.name,
    });
    res.status(200).json({
      message: "User deleted successfully.",
      data: {
        id: deletedUser.id,
      },
      success: true,
    });
  } catch (err) {
    logger.error("Failed to Delete user.", {
      action: "DELETE",
      entity: "User",
      id: req.params.id,
      error: err,
    });
    res.status(500).json({
      message: "Failed to Delete user.",
      error: err instanceof Error ? err.message : "Unknown Error Occured.",
      success: false,
    });
  }
};

export const logIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    const isPassCorrect = compareSync(password, user?.password as string);
    if (isPassCorrect) {
      const token = generateToken({
        id: user?.id,
      });
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });
      logger.info(`User ${user?.id} logged in`);
      res.status(200).json({
        message: "Log in successful.",
        authenticated: true,
        success: true,
      });
    } else {
      throw new Error("Password Incorrect.");
    }
  } catch (err) {
    logger.error(`Log in Failed`, {
      error: err,
    });
    res.status(500).json({
      message: "Log in failed.",
      error: err,
      authenticated: false,
      success: false,
    });
  }
};
