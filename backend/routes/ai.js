const express = require("express");
const { GoogleGenAI } = require("@google/genai");

const router = express.Router();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

router.post("/itinerary", async (req, res) => {
  try {
    const { destination, days, budget, interests } = req.body;

    const prompt = `
Create a ${days}-day travel itinerary.

Destination: ${destination}
Budget: ₹${budget}
Interests: ${interests}

Include:
- Morning
- Afternoon
- Evening
- Food
- Estimated budget
- Travel tips
`;

    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: prompt,
    });

    console.log(response);

    res.json({
      success: true,
      itinerary: response.text,
    });
  } catch (error) {
  console.error("Gemini Error:", error);

  if (error.response) {
    console.error("Response:", error.response.data);
  }

  res.status(500).json({
    success: false,
    message: error.message,
    details: error.response?.data || error,
  });
}
});

module.exports = router;