import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {
  return (
    <>
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-20">
        <h1 className="text-5xl font-bold mb-4">
          About EcoStay
        </h1>

        <p className="text-gray-600">
          About page placeholder.
        </p>
      </main>

      <Footer />
    </>
  );
}