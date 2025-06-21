import { Link } from "react-router-dom";

export function Home() {
  return (
    <>
      <div className="flex justify-center pt-12">
        <div className="grid grid-flow-col grid-rows-2">
          <h1 className="text-3xl font-bold">Tasks</h1>
          <Link
            to={"/create"}
            className="mt-24 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            Create
          </Link>
        </div>
      </div>
    </>
  );
}
