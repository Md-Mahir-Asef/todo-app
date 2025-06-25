import type React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Create() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Not_set");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("Todo");
  const createTask = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Create Task Called!");
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const response = await axios.post(`${baseUrl}/tasks`, {
        title,
        description,
        priority,
        dueDate,
        status,
      });
      console.log(response);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
    console.log(title, description, priority, dueDate, status);
  };
  return (
    <>
      <div className="flex flex-col items-center gap-0 justify-center">
        <h1 className="text-3xl font-bold h-fit block w-full text-center">
          Create a new task
        </h1>
        <form className="h-fit">
          <label htmlFor="title" className="text-xl">
            Title:
          </label>
          <input
            type="text"
            id="title"
            required
            onChange={(e) => setTitle(e.target.value)}
            className="w-full h-10 border border-gray-300 text-black p-2 rounded"
          />
          <label htmlFor="description" className="text-xl">
            Description:
          </label>
          <input
            type="text"
            id="description"
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-20 border border-gray-300 text-black overflow-x-scroll rounded break-words"
          />
          <label htmlFor="priority" className="text-xl">
            Priority:
          </label>
          <select
            name="priority"
            id="priority"
            onChange={(e) => setPriority(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 text-black"
          >
            <option value="Not_set">Not set</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <label htmlFor="dueDate" className="text-xl">
            Due Date
          </label>
          <input
            className="w-full h-10 border border-gray-300 text-black rounded p-2"
            onChange={(e) => setDueDate(e.target.value)}
            type="date"
            id="dueDate"
          />
          <label htmlFor="status" className="text-xl">
            Status:
          </label>
          <select
            name="status"
            id="status"
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 text-black"
          >
            <option value="Todo">Todo</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
          </select>
          <button
            type="submit"
            onClick={createTask}
            className="mt-5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            Create Task
          </button>
        </form>
      </div>
    </>
  );
}
