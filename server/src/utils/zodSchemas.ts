import { z } from "zod/v4";

export const TaskDataSchema = z.object({
  title: z.string().default("Untitled Task"),
  description: z.string().default("No Description."),
  priority: z.enum(["Not_set", "Low", "Medium", "High"]).default("Not_set"),
  dueDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      error: "Not a valid date",
    })
    .transform((date) => new Date(date).toISOString()),
  status: z.enum(["Todo", "Doing", "Done"]).default("Todo"),
});

export const UserDataSchema = z.object({
  name: z.string().min(3).max(32),
  email: z.email(),
  password: z.string().min(4).max(32),
});

export const LogInUserDateSchema = z.object({
  email: z.email(),
  password: z.string().min(4).max(32),
});
