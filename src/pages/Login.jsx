import { useState } from "react";
import { Leaf, Eye, EyeOff } from "lucide-react";
import { API_BASE_URL } from "../config/api";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // NORMAL EMAIL/PASSWORD LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${API_BASE_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        alert("Login Successful!");

        onLogin(data.user);
      } else {
        alert(
          data.message ||
          "Invalid email or password"
        );
      }
    } catch (err) {
      console.error(err);
      alert("Server Error");
    }
  };

  // GOOGLE LOGIN
  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE_URL}/api/auth/google`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-emerald-100 via-blue-100 to-yellow-50 p-6">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-10">

        <div className="text-center mb-8">
          <Leaf
            size={50}
            className="mx-auto text-emerald-600 mb-4"
          />

          <h1 className="text-6xl font-extrabold text-emerald-700">
            EcoStay
          </h1>

          <p className="text-slate-500 mt-2">
            Your Smart Eco-Tourism Companion
          </p>
        </div>

        {/* NORMAL LOGIN FORM */}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
            className="w-full border rounded-xl px-4 py-4 mb-5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <div className="relative mb-6">
            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
              className="w-full border rounded-xl px-4 py-4 pr-12 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-4 top-4 text-gray-500"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white py-4 rounded-xl font-bold text-lg hover:opacity-90 transition"
          >
            Login
          </button>
        </form>

        {/* DIVIDER */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300"></div>

          <span className="px-4 text-gray-500">
            OR
          </span>

          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* GOOGLE LOGIN */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full border border-gray-300 py-4 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition"
        >
          Continue with Google
        </button>

      </div>
    </div>
  );
};

export default Login;