import axios from "axios";
import { Link } from "react-router-dom";

export function Header() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const logouter = async () => {
    try {
      const res = axios.post(
        `${baseUrl}/user/logout`,
        {},
        { withCredentials: true }
      );
      console.log(res);
      alert("Successfully logged Out");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="p-7 pt-3 flex">
      <Link to={"/"} className="flex-11/12">
        <h1 className="text-4xl font-bold">Todo</h1>
      </Link>
      <div className="pt-3 font-medium flex flex-row">
        <Link to={"/login"} className="p-2 opacity-80 hover:opacity-100">
          login
        </Link>
        <Link to={"/sign-up"} className="p-2 opacity-80 hover:opacity-100 pl-7">
          Signup
        </Link>
        <button
          onClick={logouter}
          className="p-2 opacity-80 hover:opacity-100 pl-7"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
