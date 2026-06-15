import { User } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-emerald-600">
          EcoStay
        </h1>

        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-emerald-600">
            Home
          </a>

          <a href="#" className="hover:text-emerald-600">
            About
          </a>

          <a href="#" className="hover:text-emerald-600">
            Dashboard
          </a>

          <User size={22} />
        </div>
      </div>
    </nav>
  );
}