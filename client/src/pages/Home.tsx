import { Link } from "react-router-dom";
import { Tasks } from "../components/Tasks";

export function Home() {
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="">
          <h1 className="text-3xl font-bold mb-2">Tasks</h1>
          <Link
            to={"/create"}
            className="absolute right-157 top-20 h-fit px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            Create
          </Link>
          <Tasks />
        </div>
      </div>
    </>
  );
}
