import { Response, NextFunction } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { config } from "dotenv";
import logger from "../utils/logger";
import { AuthenticatedRequest } from "../utils/types/user";
config();

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      throw new Error("Invalid Token");
    }
    const user = verify(
      token,
      process.env.SERVER_JWT_SECRET as string
    ) as JwtPayload;
    req.user = user;
    logger.info(`User ${user.id} is authenticated.`);
    next();
  } catch (err) {
    logger.error("Invalid Token");
    res.status(401).json({
      success: false,
      authenticated: false,
      message: "Invalid Token",
    });
  }
};
