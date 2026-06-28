import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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

      <div className="max-w-6xl mx-auto px-6 py-10">
        <button
          onClick={onBack}
          className="text-green-700 font-semibold hover:underline mb-6"
        >
          ← Back
        </button>

        <div className="bg-white rounded-3xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-green-700 mb-2">
            Your Eco Trip Itinerary
          </h1>

          <p className="text-gray-500 mb-8">
            Here's your personalized travel plan.
          </p>

          {/* Trip Summary */}

          <div className="grid md:grid-cols-4 gap-6 mb-10">
            <div className="bg-green-100 rounded-xl p-5">
              <h3 className="text-gray-600">Destination</h3>
              <p className="text-xl font-bold text-green-700">
                {trip.destination}
              </p>
            </div>

            <div className="bg-green-100 rounded-xl p-5">
              <h3 className="text-gray-600">Duration</h3>
              <p className="text-xl font-bold text-green-700">
                {trip.days} Days
              </p>
            </div>

            <div className="bg-green-100 rounded-xl p-5">
              <h3 className="text-gray-600">Travelers</h3>
              <p className="text-xl font-bold text-green-700">
                {trip.travelers}
              </p>
            </div>

            <div className="bg-green-100 rounded-xl p-5">
              <h3 className="text-gray-600">Budget</h3>
              <p className="text-xl font-bold text-green-700">
                {trip.budget}
              </p>
            </div>
          </div>

          {/* Trip Preferences */}

          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">
              Trip Preferences
            </h2>

            <p>
              <strong>Travel Style:</strong>{" "}
              {trip.travelStyle}
            </p>

            <p>
              <strong>Accommodation:</strong>{" "}
              {trip.accommodation}
            </p>

            <p>
              <strong>Month:</strong>{" "}
              {trip.month}
            </p>

            <p>
              <strong>Activities:</strong>{" "}
              {trip.activities?.join(", ")}
            </p>

            <p>
              <strong>Notes:</strong>{" "}
              {trip.notes || "None"}
            </p>
          </div>

          {/* Daily Itinerary */}

          {trip.itinerary?.map((day) => (
            <div
              key={day.day}
              className="bg-white border rounded-2xl p-6 mb-6 shadow"
            >
              <h2 className="text-2xl font-bold text-green-700 mb-4">
                Day {day.day}
              </h2>

              <ul className="list-disc pl-6 space-y-2">
                {day.activities.map((activity, index) => (
                  <li key={index}>
                    {activity}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="flex justify-center gap-4 mt-8">
            <button className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700">
              Save Itinerary
            </button>

            <button
              onClick={onBack}
              className="bg-yellow-500 text-white px-6 py-3 rounded-xl hover:bg-yellow-600"
            >
              Edit Trip
            </button>

            <button className="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600">
              Delete Trip
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}