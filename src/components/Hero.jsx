import { Leaf } from "lucide-react";

export default function Hero({ onGetStarted }) {
  return (
    <>
      {/* White Header */}
      <div className="bg-white py-5 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-3">
          <Leaf size={42} className="text-emerald-700" />

          <h1 className="text-4xl font-extrabold text-emerald-700">
            EcoStay
          </h1>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-500 to-green-700 text-white py-28">
        <div className="max-w-5xl mx-auto text-center px-6">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Sustainable Travel Starts Here
          </h2>

          <p className="text-xl text-emerald-50 mb-10">
            Discover eco-friendly homestays and responsible tourism
            experiences.
          </p>

          <button
            onClick={onGetStarted}
            className="bg-white text-emerald-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition"
          >
            Explore Now
          </button>
        </div>
      </section>
    </>
  );
}