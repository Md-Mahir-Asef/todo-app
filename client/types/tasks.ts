type Priority = "Not_set" | "Low" | "Medium" | "High";
type TaskStatus = "Todo" | "Doing" | "Done";

export type TaskType = {
  id: string;
  title: string;
  description?: string;
  priority?: Priority;
  dueDate?: string;
  status?: TaskStatus;
};
