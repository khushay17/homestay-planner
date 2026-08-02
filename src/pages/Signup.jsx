import { useState } from "react";
import { Leaf, Eye, EyeOff } from "lucide-react";
import { API_BASE_URL } from "../config/api";

export default function Signup({ onSignup, onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registration Successful!");
        onSignup();
      } else {
        const errorMsg =
          data.errors && data.errors.length > 0
            ? data.errors.map((e) => e.msg).join("\n")
            : data.message || "Registration Failed";
        alert(errorMsg);
      }
    } catch (err) {
      console.error(err);
      alert("Server Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-emerald-100 via-blue-100 to-yellow-50 p-6">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-10">

        <div className="text-center mb-8">
          <Leaf size={50} className="mx-auto text-emerald-600 mb-4" />

          <h1 className="text-5xl font-bold text-emerald-700">
            Create Account
          </h1>

          <p className="text-slate-500 mt-2">
            Join EcoStay
          </p>
        </div>

        <form onSubmit={handleSignup}>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            required
            className="w-full border rounded-xl px-4 py-4 mb-4"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
            className="w-full border rounded-xl px-4 py-4 mb-4"
          />

          <div className="relative mb-6">

            <input
              type={showPassword ? "text":"password"}
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
              className="w-full border rounded-xl px-4 py-4 pr-12"
            />

            <button
              type="button"
              className="absolute right-4 top-4"
              onClick={()=>setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
            </button>

          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold hover:bg-emerald-700"
          >
            Register
          </button>

        </form>

        <div className="text-center mt-6">

          <p className="text-gray-600">
            Already have an account?
          </p>

          <button
            onClick={onLogin}
            className="mt-2 text-emerald-600 font-semibold"
          >
            Login
          </button>

        </div>

      </div>
    </div>
  );
}