import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Homestays({
  user,
  onLogout,
  onAbout,
  onBack,
}) {

  const [destination, setDestination] = useState("");
  const [homestays, setHomestays] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchHomestays = async () => {

    if (!destination) {
      alert("Enter a destination");
      return;
    }

    setLoading(true);

    try {

      const response = await fetch(
        `http://localhost:5000/api/homestays?destination=${destination}`
      );

      const data = await response.json();

      setHomestays(data);

    } catch (err) {
      console.log(err);
      alert("Unable to connect to backend.");
    }

    setLoading(false);
  };

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
          className="text-green-700 font-semibold mb-6 hover:underline"
        >
          ← Back
        </button>

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <h1 className="text-4xl font-bold text-green-700 mb-2">
            Explore Homestays
          </h1>

          <p className="text-gray-500 mb-8">
            Search eco-friendly homestays by destination.
          </p>

          <div className="flex gap-4 mb-10">

            <input
              type="text"
              placeholder="Enter destination"
              value={destination}
              onChange={(e)=>setDestination(e.target.value)}
              className="flex-1 border rounded-xl p-3"
            />

            <button
              onClick={searchHomestays}
              className="bg-green-600 text-white px-8 rounded-xl hover:bg-green-700"
            >
              Search
            </button>

          </div>

          {loading && (
            <p>Loading...</p>
          )}

          {!loading && homestays.length===0 && (
            <p className="text-gray-500">
              No homestays found.
            </p>
          )}

          <div className="grid md:grid-cols-2 gap-8">

            {homestays.map(home=>(

              <div
                key={home.id}
                className="bg-white border rounded-2xl shadow p-6"
              >

                <img
                  src={home.image}
                  alt={home.name}
                  className="w-full h-52 object-cover rounded-xl mb-4"
                />

                <h2 className="text-2xl font-bold text-green-700">
                  {home.name}
                </h2>

                <p className="text-gray-500">
                  {home.destination}
                </p>

                <p className="mt-2">
                  ⭐ {home.rating}
                </p>

                <p className="font-bold text-lg">
                  ₹{home.price}/night
                </p>

                <p className="mt-3 text-gray-600">
                  {home.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-4">

                  {home.amenities.map((item,index)=>(

                    <span
                      key={index}
                      className="bg-green-100 px-3 py-1 rounded-full text-sm"
                    >
                      {item}
                    </span>

                  ))}

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

      <Footer />

    </div>
  );
}