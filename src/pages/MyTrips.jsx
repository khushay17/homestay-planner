import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MyTrips({
  user,
  onLogout,
  onAbout,
  onBack,
}) {
  const [trips, setTrips] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [budget, setBudget] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchTrips = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/trips", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        onLogout();
        return;
      }

      const data = await res.json();

      if (res.ok) {
        setTrips(data);
      } else {
        console.error(data);
      }
    } catch (err) {
      console.error("Error fetching trips:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const deleteTrip = async (id) => {
    if (!window.confirm("Delete this trip?")) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/trips/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        fetchTrips();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateTrip = async (trip) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/trips/${trip._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...trip,
            budget,
          }),
        }
      );

      if (res.ok) {
        setEditingId(null);
        fetchTrips();
      }
    } catch (err) {
      console.error(err);
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

        <h1 className="text-4xl font-bold text-green-700 mb-8">
          My Trips
        </h1>

        {loading ? (
          <p>Loading trips...</p>
        ) : trips.length === 0 ? (
          <p>No trips found.</p>
        ) : (
          trips.map((trip) => (
            <div
              key={trip._id}
              className="bg-white rounded-2xl shadow-lg p-6 mb-6"
            >
              <h2 className="text-2xl font-bold">
                {trip.destination}
              </h2>

              <p>Days: {trip.days}</p>
              <p>Travelers: {trip.travelers}</p>

              <p>
                Budget:{" "}
                {editingId === trip._id ? (
                  <input
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="border p-1 rounded"
                  />
                ) : (
                  trip.budget
                )}
              </p>

              <p>Style: {trip.travelStyle}</p>
              <p>Accommodation: {trip.accommodation}</p>

              <div className="mt-4 flex gap-3">
                {editingId === trip._id ? (
                  <button
                    onClick={() => updateTrip(trip)}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditingId(trip._id);
                      setBudget(trip.budget);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Edit
                  </button>
                )}

                <button
                  onClick={() => deleteTrip(trip._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <Footer />
    </div>
  );
}