import bcrypt from "bcrypt";
import { config } from "dotenv";
config();

const ROUND = parseInt(process.env.SERVER_BCRYPT_SALT_ROUND as string) || 10;

export const hasher = (data: string): string => {
  const salt = bcrypt.genSaltSync(ROUND);
  const hashedData = bcrypt.hashSync(data, salt);
  return hashedData;
};
