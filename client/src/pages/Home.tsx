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
            className="absolute right-157 top-20 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Create
          </Link>
          <Tasks />
        </div>
      </div>
    </>
  );
}
