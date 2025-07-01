import { Router } from "express";
import {
  signUp,
  deleteUser,
  logOut,
  logIn,
} from "../controllers/auth.controller";
import taskRoute from "./task.route";
import { authMiddleware } from "../middleware/auth.middleware";

const authRoute = Router();

authRoute.use("/task", authMiddleware, taskRoute);
authRoute.post("/sign-up", signUp);
authRoute.delete("/:id", authMiddleware, deleteUser);
authRoute.post("/logout", authMiddleware, logOut);
authRoute.post("/login", logIn);

export default authRoute;
