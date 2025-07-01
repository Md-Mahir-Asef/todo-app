import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

const SECRET = process.env.SERVER_JWT_SECRET as string;

export const generateToken = (payload: object): string => {
  const token = jwt.sign(payload, SECRET, { expiresIn: "7d" });
  return token;
};
