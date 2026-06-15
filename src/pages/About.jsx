import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar user="Guest" />

      <main className="max-w-5xl mx-auto px-6 py-20">
        <h1 className="text-5xl font-bold text-slate-800 mb-6">
          About EcoStay
        </h1>

        <p className="text-lg text-slate-600 leading-8">
          EcoStay is a sustainable tourism platform that connects travelers
          with eco-friendly homestays and responsible travel experiences.
          Our mission is to promote environmental awareness while supporting
          local communities through tourism.
        </p>

        <div className="mt-12 bg-white p-8 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold mb-4">
            Our Vision
          </h2>

          <p className="text-slate-600">
            To make sustainable travel accessible, affordable, and impactful
            for everyone.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}