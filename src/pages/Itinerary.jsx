import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ReactMarkdown from "react-markdown";

export default function Itinerary({
  user,
  trip,
  onLogout,
  onAbout,
  onBack,
}) {
  if (!trip) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl">
        No itinerary found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50">
      <Navbar
        user={user}
        onLogout={onLogout}
        onAbout={onAbout}
      />

      <div className="max-w-5xl mx-auto px-6 py-10">

        <button
          onClick={onBack}
          className="text-green-700 font-semibold hover:underline mb-6"
        >
          ← Back
        </button>

        <div className="bg-white rounded-3xl shadow-xl p-8">

          <h1 className="text-4xl font-bold text-green-700 mb-3">
            AI Generated Eco Trip
          </h1>

          <p className="text-gray-500 mb-8">
            Your personalized itinerary has been created using AI.
          </p>

          <div className="prose max-w-none">
            <ReactMarkdown>
              {trip.itinerary}
            </ReactMarkdown>
          </div>

          <div className="flex justify-center mt-10">
            <button
              onClick={onBack}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl"
            >
              Plan Another Trip
            </button>
          </div>

        </div>

      </div>

      <Footer />
    </div>
  );
}