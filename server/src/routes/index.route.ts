import { Router } from "express";
import userRoute from "./auth.route";

const router = Router();

router.use("/user", userRoute);

export default router;
