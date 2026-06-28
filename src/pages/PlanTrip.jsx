import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PlanTrip({
  user,
  onLogout,
  onAbout,
  onGenerate,
  onBack,
}) {
  const [trip, setTrip] = useState({
    destination: "",
    days: "",
    persons: "",
    budget: "",
    travelStyle: "",
    accommodation: "",
    month: "",
    activities: [],
    notes: "",
  });

  const activityOptions = [
    "Trekking",
    "Boating",
    "Wildlife",
    "Photography",
    "Camping",
    "Local Culture",
  ];

  const handleChange = (e) => {
    setTrip({
      ...trip,
      [e.target.name]: e.target.value,
    });
  };

  const handleActivity = (activity) => {
    if (trip.activities.includes(activity)) {
      setTrip({
        ...trip,
        activities: trip.activities.filter((a) => a !== activity),
      });
    } else {
      setTrip({
        ...trip,
        activities: [...trip.activities, activity],
      });
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (
    !trip.destination ||
    !trip.days ||
    !trip.persons ||
    !trip.budget
  ) {
    alert("Please fill all required fields.");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/trips", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        destination: trip.destination,
        days: Number(trip.days),
        travelers: Number(trip.persons),
        budget: trip.budget,
        travelStyle: trip.travelStyle,
        accommodation: trip.accommodation,
        month: trip.month,
        activities: trip.activities,
        notes: trip.notes,
      }),
    });

    const data = await response.json();
    console.log("Backend Response:", data);

    if (!response.ok) {
      alert(data.message);
      return;
    }

    // Pass backend response to Itinerary page
    onGenerate(data);

  } catch (error) {
    console.error(error);
    alert("Unable to connect to backend.");
  }
};

  return (
    <div className="min-h-screen bg-green-50">
      <Navbar
        user={user}
        onLogout={onLogout}
        onAbout={onAbout}
      />

      <div className="max-w-5xl mx-auto py-10 px-6">

        <button
          onClick={onBack}
          className="mb-6 text-green-700 font-semibold hover:underline"
        >
          ← Back
        </button>

        <div className="bg-white rounded-3xl shadow-xl p-10">

          <h1 className="text-4xl font-bold text-green-700 mb-2">
            Plan Your Eco Trip
          </h1>

          <p className="text-gray-500 mb-8">
            Enter your travel preferences to generate a personalized itinerary.
          </p>

          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-2 gap-6"
          >

            {/* Destination */}

            <div>
              <label className="font-semibold block mb-2">
                Destination
              </label>

              <input
                type="text"
                name="destination"
                placeholder="e.g. Nainital"
                value={trip.destination}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            {/* Days */}

            <div>
              <label className="font-semibold block mb-2">
                Number of Days
              </label>

              <input
                type="number"
                name="days"
                value={trip.days}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
                required
              />
            </div>

            {/* Persons */}

            <div>
              <label className="font-semibold block mb-2">
                Number of Travelers
              </label>

              <input
                type="number"
                name="persons"
                value={trip.persons}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
                required
              />
            </div>

            {/* Budget */}

            <div>
              <label className="font-semibold block mb-2">
                Budget
              </label>

              <select
                name="budget"
                value={trip.budget}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              >
                <option value="">Select Budget</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            {/* Travel Style */}

            <div>
              <label className="font-semibold block mb-2">
                Travel Style
              </label>

              <select
                name="travelStyle"
                value={trip.travelStyle}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              >
                <option value="">Choose Style</option>
                <option>Adventure</option>
                <option>Nature</option>
                <option>Relaxation</option>
                <option>Cultural</option>
              </select>
            </div>

            {/* Accommodation */}

            <div>
              <label className="font-semibold block mb-2">
                Accommodation
              </label>

              <select
                name="accommodation"
                value={trip.accommodation}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              >
                <option value="">Select</option>
                <option>Homestay</option>
                <option>Hotel</option>
                <option>Camping</option>
              </select>
            </div>

            {/* Month */}

            <div>
              <label className="font-semibold block mb-2">
                Travel Month
              </label>

              <select
                name="month"
                value={trip.month}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              >
                <option value="">Select Month</option>
                <option>January</option>
                <option>February</option>
                <option>March</option>
                <option>April</option>
                <option>May</option>
                <option>June</option>
                <option>July</option>
                <option>August</option>
                <option>September</option>
                <option>October</option>
                <option>November</option>
                <option>December</option>
              </select>
            </div>

            {/* Empty column */}

            <div></div>

            {/* Activities */}

            <div className="md:col-span-2">
              <label className="font-semibold block mb-3">
                Preferred Activities
              </label>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">

                {activityOptions.map((activity) => (

                  <label
                    key={activity}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      checked={trip.activities.includes(activity)}
                      onChange={() =>
                        handleActivity(activity)
                      }
                    />

                    {activity}
                  </label>

                ))}

              </div>
            </div>

            {/* Notes */}

            <div className="md:col-span-2">
              <label className="font-semibold block mb-2">
                Additional Notes
              </label>

              <textarea
                rows="5"
                name="notes"
                placeholder="Any special requirements..."
                value={trip.notes}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              />
            </div>

            {/* Button */}

            <div className="md:col-span-2 text-center">

              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-xl text-lg font-semibold transition"
              >
                Generate Itinerary
              </button>

            </div>

          </form>

        </div>

      </div>

      <Footer />
    </div>
  );
}