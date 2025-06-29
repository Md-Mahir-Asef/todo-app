import { useEffect, useState } from "react";
import axios from "axios";
import type { TaskType } from "../../types/tasks";
import { DialogBox } from "./DialogueBox";
import { useNavigate } from "react-router-dom";

export function Tasks() {
  type SortableFeilds =
    | "priority"
    | "dueDate"
    | "createdAt"
    | "updatedAt"
    | "status";
  type SortOrderType = "desc" | "asc";
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortFeild, setSortFeild] = useState<SortableFeilds>("createdAt");
  const [sortOrder, setSortOrder] = useState<SortOrderType>("desc");
  const [showDeleteDialogue, setShowDeleteDialogue] = useState<boolean>(false);
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const loadTasks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${baseUrl}/user/task/${sortFeild}/${sortOrder}`,
        { withCredentials: true }
      );
      setTasks(res.data);
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log(err);
      }
      alert("Please, Login to view your tasks.");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const deletedTask = await axios.delete<TaskType>(
        `${baseUrl}/user/task/${id}`,
        {
          withCredentials: true,
        }
      );
      console.log(deletedTask);
      setShowDeleteDialogue(true);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [sortFeild, sortOrder]);

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
            style={{ padding: "4px 8px" }}
            value={sortFeild}
            onChange={(event) => {
              setSortFeild(event.target.value as SortableFeilds);
            }}
          >
            <option value="createdAt">Created At</option>
            <option value="updatedAt">Updated At</option>
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
            <option value="status">Status</option>
          </select>

          <select
            id="sortOrder"
            style={{ padding: "4px 8px" }}
            value={sortOrder}
            onChange={(event) => {
              setSortOrder(event.target.value as SortOrderType);
            }}
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
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

              <div className="grid grid-cols-3 gap-y-1 text-sm text-gray-700 mb-3">
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

              {/* Buttons container */}
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => navigate("/update", { state: task })}
                  className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  Delete
                </button>
                {showDeleteDialogue && (
                  <DialogBox
                    message="Task Deleted"
                    onClose={() => setShowDeleteDialogue(false)}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
