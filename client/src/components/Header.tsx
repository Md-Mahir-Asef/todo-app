import { Link } from "react-router-dom";

export function Header() {
  return (
    <div className="p-7 pt-3 flex">
      <Link to={"/"} className="flex-11/12">
        <h1 className="text-4xl font-bold">Todo</h1>
      </Link>
      <div className="pt-3 font-medium">
        <Link to={"/login"} className="p-2 opacity-80 hover:opacity-100">login</Link>
        <Link to={"/sign-up"} className="p-2 opacity-80 hover:opacity-100 pl-7">sign up</Link>
      </div>
    </div>
  );
}
