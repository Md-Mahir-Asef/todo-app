import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const logInhandeler = async () => {
    try {
      const res = await axios.post(
        `${baseUrl}/user/login`,
        { email, password },
        { withCredentials: true }
      );
      if (res.status === 500 && res.data.authenticated === false) {
        throw new Error("Log In Failed!");
      }
      navigate("/");
      alert("Successfully Logged In.");
      console.log(res);
    } catch (error) {
      console.log(error);
      alert("Logged In Failed.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Log In</h1>
          <p className="text-gray-600">Log in to your account to get started</p>
        </div>

        <div className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password *
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            />
          </div>
          <button
            type="button"
            onClick={logInhandeler}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Log In
          </button>
        </div>

        <div className="text-center mt-6">
          <Link
            to={"/sign-up"}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
          >
            ← Don't have an account? sign up
          </Link>
        </div>
      </div>
    </div>
  );
};
