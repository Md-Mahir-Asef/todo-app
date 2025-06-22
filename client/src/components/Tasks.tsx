import { useEffect, useState } from "react";
import axios from "axios";
import type { TaskType } from "../../types/tasks";

export function Tasks() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const baseUrl = process.env.REACT_APP_API_BASE_URL;
        const res = await axios.get<TaskType[]>(`${baseUrl}/tasks`);
        setTasks(res.data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.log(err.message);
        } else {
          console.log(err);
        }
      } finally {
        setLoading(false);
      }
    };
    loadTasks();
  }, []);
  if (loading) return <p>Loading...</p>;
  return (
    <>
      {tasks.map((task) => {
        return <div key={task.id}>{task.title}</div>;
      })}
    </>
  );
}
