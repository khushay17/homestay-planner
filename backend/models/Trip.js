const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    destination: {
      type: String,
      required: true,
    },

    days: {
      type: Number,
      required: true,
    },

    travelers: {
      type: Number,
      default: 1,
    },

    budget: {
      type: String,
      default: "",
    },

    travelStyle: {
      type: String,
      default: "",
    },

    accommodation: {
      type: String,
      default: "",
    },

    month: {
      type: String,
      default: "",
    },

    activities: {
      type: [String],
      default: [],
    },

    notes: {
      type: String,
      default: "",
    },

    itinerary: [
      {
        day: Number,
        activities: [String],
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Trip", tripSchema);