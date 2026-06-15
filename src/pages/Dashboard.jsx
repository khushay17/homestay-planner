import { Map, House, Leaf } from "lucide-react";

import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Footer from "../components/Footer";

export default function Dashboard({
  user,
  onLogout,
  onAbout,
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
  user={user}
  onLogout={onLogout}
  onAbout={onAbout}
/>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="bg-white rounded-3xl shadow-lg p-10 mb-12">
          <h1 className="text-5xl font-bold text-slate-800 mb-3">
            Welcome {user}
          </h1>

          <p className="text-slate-600 text-lg">
            Manage your eco-tourism journey from one place.
          </p>
        </div>

        <h2 className="text-4xl font-bold mb-10">
          Explore Features
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <Card
            icon={<Map size={45} className="text-teal-500" />}
            title="Plan a Trip"
            description="Create eco-friendly travel plans based on your destination."
          />

          <Card
            icon={<House size={45} className="text-blue-500" />}
            title="Explore Homestays"
            description="Discover local stays and authentic cultural experiences."
          />

          <Card
            icon={<Leaf size={45} className="text-green-500" />}
            title="Sustainability Tips"
            description="Learn responsible travel habits and reduce environmental impact."
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}