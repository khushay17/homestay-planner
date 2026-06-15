import { User } from "lucide-react";

export default function Navbar({
  user,
  onLogout,
  onAbout,
}) {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-emerald-600">
          EcoStay
        </h1>

        <div className="flex items-center gap-6">
          <button
            onClick={onAbout}
            className="hover:text-emerald-600"
          >
            About
          </button>

          <button
            onClick={onLogout}
            className="hover:text-red-500"
          >
            Logout
          </button>

          <User size={22} />
        </div>
      </div>
    </nav>
  );
}