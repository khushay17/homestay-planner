const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

let trips = [];

// ------------------------------
// SAMPLE HOMESTAYS
// ------------------------------

const homestays = [

  // MUSSOORIE
  {
    id: 1,
    destination: "Mussoorie",
    name: "Green Valley Homestay",
    rating: 4.8,
    price: 2500,
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    amenities: ["Mountain View", "Breakfast", "WiFi"],
    description: "Eco-friendly stay near Kempty Falls."
  },
  {
    id: 2,
    destination: "Mussoorie",
    name: "Pine Woods Retreat",
    rating: 4.7,
    price: 2200,
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    amenities: ["Bonfire", "Garden", "Parking"],
    description: "Peaceful homestay surrounded by pine forests."
  },
  {
    id: 3,
    destination: "Mussoorie",
    name: "Cloud View Cottage",
    rating: 4.9,
    price: 3400,
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
    amenities: ["Balcony", "Breakfast", "WiFi"],
    description: "Luxury stay with panoramic Himalayan views."
  },

  // NAINITAL
  {
    id: 4,
    destination: "Nainital",
    name: "Lake View Cottage",
    rating: 4.9,
    price: 3200,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    amenities: ["Lake View", "Breakfast", "WiFi"],
    description: "Beautiful cottage overlooking Naini Lake."
  },
  {
    id: 5,
    destination: "Nainital",
    name: "Pine Forest Homestay",
    rating: 4.8,
    price: 2800,
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
    amenities: ["Parking", "Bonfire", "Mountain View"],
    description: "Cozy wooden homestay amidst pine forests."
  },
  {
    id: 6,
    destination: "Nainital",
    name: "Eco Nature Retreat",
    rating: 4.7,
    price: 3600,
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    amenities: ["Restaurant", "Garden", "WiFi"],
    description: "Peaceful eco-retreat with beautiful valley views."
  },

  // MANALI
  {
    id: 7,
    destination: "Manali",
    name: "Snow Peak Homestay",
    rating: 4.8,
    price: 3000,
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739",
    amenities: ["Fireplace", "Breakfast", "WiFi"],
    description: "Traditional wooden cottage with mountain views."
  },
  {
    id: 8,
    destination: "Manali",
    name: "River Side Stay",
    rating: 4.7,
    price: 2700,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    amenities: ["River View", "Parking", "WiFi"],
    description: "Homestay beside the Beas River."
  },
  {
    id: 9,
    destination: "Manali",
    name: "Apple Orchard Cottage",
    rating: 4.9,
    price: 3500,
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156",
    amenities: ["Garden", "Breakfast", "Mountain View"],
    description: "Stay surrounded by apple orchards."
  },

  // SHIMLA
  {
    id: 10,
    destination: "Shimla",
    name: "Hill Breeze Stay",
    rating: 4.6,
    price: 2400,
    image: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c",
    amenities: ["Garden", "Breakfast", "Parking"],
    description: "Comfortable stay near Mall Road."
  },
  {
    id: 11,
    destination: "Shimla",
    name: "Cedar Lodge",
    rating: 4.8,
    price: 3100,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    amenities: ["Mountain View", "Fireplace", "WiFi"],
    description: "Peaceful cedar wood cottage."
  },

  // RISHIKESH
  {
    id: 12,
    destination: "Rishikesh",
    name: "River View Ashram",
    rating: 4.8,
    price: 2600,
    image: "https://images.unsplash.com/photo-1482192505345-5655af888cc4",
    amenities: ["Yoga", "Breakfast", "River View"],
    description: "Relaxing stay beside the Ganga River."
  }
];

// ------------------------------
// ITINERARY GENERATOR
// ------------------------------

function generateItinerary(destination, days) {

  const places = {

    Mussoorie: [
      ["Check-in at Eco Homestay", "Visit Kempty Falls", "Mall Road Walk"],
      ["Gun Hill Ropeway", "Company Garden", "Local Shopping"],
      ["Cloud's End", "Photography", "Return Journey"]
    ],

    Nainital: [
      ["Arrival & Check-in", "Boating at Naini Lake", "Mall Road"],
      ["Snow View Point", "Eco Cave Garden", "Shopping"],
      ["Bhimtal", "Nature Walk", "Return Journey"]
    ],

    Manali: [
      ["Hadimba Temple", "Old Manali", "Cafe Visit"],
      ["Solang Valley", "Adventure Sports", "Bonfire"],
      ["Jogini Waterfall", "Shopping", "Return Journey"]
    ],

    Shimla: [
      ["Mall Road", "Christ Church", "The Ridge"],
      ["Jakhoo Temple", "Kufri", "Shopping"],
      ["Nature Walk", "Local Food", "Return Journey"]
    ],

    Rishikesh: [
      ["Triveni Ghat", "Ganga Aarti"],
      ["River Rafting", "Lakshman Jhula"],
      ["Yoga Session", "Return Journey"]
    ]
  };

  const plan = places[destination] || [
    ["Breakfast", "Explore Local Attractions", "Dinner"]
  ];

  let itinerary = [];

  for (let i = 0; i < days; i++) {
    itinerary.push({
      day: i + 1,
      activities: plan[i] || [
        "Explore nearby places",
        "Taste local cuisine",
        "Relax"
      ]
    });
  }

  return itinerary;
}

// ------------------------------
// TRIP APIs
// ------------------------------

app.get("/api/trips", (req, res) => {
  res.json(trips);
});

app.get("/api/trips/search", (req, res) => {

  const q = (req.query.q || "").toLowerCase();

  const result = trips.filter((trip) =>
    trip.destination.toLowerCase().includes(q)
  );

  res.json(result);
});

app.get("/api/trips/:id", (req, res) => {

  const trip = trips.find(
    t => t.id === Number(req.params.id)
  );

  if (!trip) {
    return res.status(404).json({
      message: "Trip not found"
    });
  }

  res.json(trip);
});

app.post("/api/trips", (req, res) => {

  const {
    destination,
    days,
    travelers,
    budget,
    travelStyle,
    accommodation,
    month,
    activities,
    notes
  } = req.body;

  if (!destination || !days) {
    return res.status(400).json({
      message: "Destination and days are required"
    });
  }

  const newTrip = {

    id: trips.length + 1,

    destination,

    days: Number(days),

    travelers: Number(travelers),

    budget,

    travelStyle,

    accommodation,

    month,

    activities: activities || [],

    notes: notes || "",

    itinerary: generateItinerary(
      destination,
      Number(days)
    )

  };

  trips.push(newTrip);

  res.status(201).json(newTrip);
});

app.put("/api/trips/:id", (req, res) => {

  const trip = trips.find(
    t => t.id === Number(req.params.id)
  );

  if (!trip) {
    return res.status(404).json({
      message: "Trip not found"
    });
  }

  Object.assign(trip, req.body);

  trip.itinerary = generateItinerary(
    trip.destination,
    Number(trip.days)
  );

  res.json(trip);
});

app.delete("/api/trips/:id", (req, res) => {

  const index = trips.findIndex(
    t => t.id === Number(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Trip not found"
    });
  }

  trips.splice(index, 1);

  res.json({
    message: "Trip deleted successfully"
  });
});

// ------------------------------
// HOMESTAY APIs
// ------------------------------

// Search homestays
app.get("/api/homestays", (req, res) => {

  const destination =
    (req.query.destination || "").toLowerCase();

  const result = homestays.filter((home) =>
    home.destination.toLowerCase() === destination
  );

  res.json(result);
});

// Get homestay by ID
app.get("/api/homestays/:id", (req, res) => {

  const homestay = homestays.find(
    h => h.id === Number(req.params.id)
  );

  if (!homestay) {
    return res.status(404).json({
      message: "Homestay not found"
    });
  }

  res.json(homestay);
});

// ------------------------------
// 404 Route Handler
// ------------------------------
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// ------------------------------
// Global Error Handling Middleware
// ------------------------------
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});