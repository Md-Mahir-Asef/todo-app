import { useEffect, useState } from "react";
import axios from "axios";
import type { TaskType } from "../../types/tasks";

export function Tasks() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        console.log("Inside loadTasks.");
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        const res = await axios.get<TaskType[]>(`${baseUrl}/tasks`);
        setTasks(res.data);
        console.log(res.data);
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
      <div>
        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
            fontSize: 14,
          }}
        >
          <label htmlFor="sortField">Sort By:</label>
          <select
            id="sortField"
            defaultValue="createdAt"
            style={{ padding: "4px 8px" }}
          >
            <option value="priority">Priority</option>
            <option value="dueDate">Due Date</option>
            <option value="createdAt">Created At</option>
            <option value="updatedAt">Updated At</option>
          </select>

          <select
            id="sortOrder"
            defaultValue="desc"
            style={{ padding: "4px 8px" }}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        {tasks.map((task) => {
          return (
            <div className="w-full max-w-2xl rounded-lg border border-gray-200 bg-gradient-to-br from-white to-blue-50 px-6 py-3 shadow-sm mb-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-bold text-blue-700">
                  {task.title}
                </h2>
                <span className="text-sm text-blue-600">{task.status}</span>
              </div>

              <p className="text-sm text-gray-800 mb-2">
                <span className="font-semibold text-gray-600">
                  Description:
                </span>{" "}
                {task.description ? task.description : "No description"}
              </p>

              <div className="grid grid-cols-3 gap-y-1 text-sm text-gray-700">
                <p>
                  <span className="font-semibold text-gray-600">Priority:</span>{" "}
                  {task.priority}
                </p>
                <p>
                  <span className="font-semibold text-gray-600">Created:</span>{" "}
                  {new Date(task.createdAt).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-semibold text-gray-600">Updated:</span>{" "}
                  {new Date(task.updatedAt).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-semibold text-gray-600">Due Date:</span>{" "}
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString()
                    : "None"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
