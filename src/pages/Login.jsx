import { useState } from "react";
import { Leaf, Eye, EyeOff } from "lucide-react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] =
    useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    onLogin(email.split("@")[0]);
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

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
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

        <div className="text-center mt-8 text-slate-500">
          <p>Demo Login</p>
          <p>admin@ecostay.com</p>
          <p>Password: 123456</p>
        </div>
      </div>
    </div>
  );
}