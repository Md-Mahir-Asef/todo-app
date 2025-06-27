import { Router } from "express";
import taskRoute from "./task";
import userRoute from "./user";

const router = Router();

router.use("/task", taskRoute);
router.use("/user", userRoute);

export default router;