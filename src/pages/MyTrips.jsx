import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { API_BASE_URL } from "../config/api";

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
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const fetchTrips = async () => {
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/trips`, {
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
        setError(data.message || "Failed to load trips.");
      }
    } catch (err) {
      setError("Unable to connect to server.");
      console.error(err);
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
        `${API_BASE_URL}/api/trips/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMessage("Trip deleted successfully.");
        setError("");
        fetchTrips();
      } else {
        setError(data.message || "Delete failed.");
      }
    } catch (err) {
      setError("Server error.");
    }
  };

  const updateTrip = async (trip) => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/trips/${trip._id}`,
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

      const data = await res.json();

      if (res.ok) {
        setEditingId(null);
        setMessage("Trip updated successfully.");
        setError("");
        fetchTrips();
      } else {
        setError(data.message || "Update failed.");
      }
    } catch (err) {
      setError("Server error.");
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

        <h1 className="text-4xl font-bold text-green-700 mb-6">
          My Trips
        </h1>

        {message && (
          <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-lg">Loading trips...</p>
        ) : trips.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
            <h2 className="text-2xl font-bold text-green-700">
              No Trips Yet
            </h2>

            <p className="text-gray-500 mt-2">
              Create your first eco-friendly trip.
            </p>
          </div>
        ) : (
          trips.map((trip) => (
            <div
              key={trip._id}
              className="bg-white rounded-2xl shadow-lg p-6 mb-6"
            >
              <h2 className="text-2xl font-bold text-green-700">
                {trip.destination}
              </h2>

              <p className="mt-2">
                <strong>Days:</strong> {trip.days}
              </p>

              <p>
                <strong>Travelers:</strong> {trip.travelers}
              </p>

              <p>
                <strong>Budget:</strong>{" "}

                {editingId === trip._id ? (
                  <input
                    value={budget}
                    onChange={(e) =>
                      setBudget(e.target.value)
                    }
                    className="border rounded p-1 ml-2"
                  />
                ) : (
                  trip.budget
                )}
              </p>

              <p>
                <strong>Travel Style:</strong>{" "}
                {trip.travelStyle}
              </p>

              <p>
                <strong>Accommodation:</strong>{" "}
                {trip.accommodation}
              </p>

              <p>
                <strong>Month:</strong> {trip.month}
              </p>

              {trip.activities?.length > 0 && (
                <p>
                  <strong>Activities:</strong>{" "}
                  {trip.activities.join(", ")}
                </p>
              )}

              <div className="mt-5 flex gap-3">

                {editingId === trip._id ? (
                  <button
                    onClick={() => updateTrip(trip)}
                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditingId(trip._id);
                      setBudget(trip.budget);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                  >
                    Edit
                  </button>
                )}

                <button
                  onClick={() => deleteTrip(trip._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
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