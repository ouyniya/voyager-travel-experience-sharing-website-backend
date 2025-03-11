const axios = require("axios");
require("dotenv").config(); // ✅ Load env variables

const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // ✅ Use API Key from .env

const aiChat = async (req, res, next) => {
  try {
    const { budget, period, beginningPoint, region, transportation, numberOfTravellers, tripType, moodAndTone } = req.body;

    console.log("User Input:", { budget, period, beginningPoint, region, transportation, numberOfTravellers, tripType, moodAndTone });

    // ✅ Validate required fields
    if (!budget || !period || !beginningPoint || !region || !transportation || !numberOfTravellers || !tripType || !moodAndTone || !Array.isArray(tripType)) {
      return res.status(400).json({ error: "All fields are required, and tripType must be an array." });
    }

    // ✅ Use gemini-2.0-flash (v1beta)
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

    // ✅ Construct AI prompt with HTML formatting
    const prompt = `
    I want to plan a trip with the following details:
    - Budget: ${budget} THB
    - Trip Duration: ${period} days
    - Starting Point: ${beginningPoint}
    - Region: ${region}
    - Mode of Transport: ${transportation}
    - Number of Travellers: ${numberOfTravellers}
    - Trip Type: ${tripType.join(", ")}
    - Current Mood & Tone: ${moodAndTone}

    Format the response **in valid HTML**, ensuring:
    - Provide **3 different trip options**, clearly separated.
    - Each trip should be structured like:
      <h2>Trip Option 1</h2>
      <p>Short trip description.</p>
      <h3>Day 1</h3> 
      <ul><li>Activity description + cost</li></ul>
      <h3>Day 2</h3> 
      <ul><li>Activity description + cost</li></ul>
      <h3>Conclusion</h3> 
      <p>Remaining budget: XXX THB</p>
    - Keep it **short, clear, and easy to read**.
    - **Make the trip budget closest to the given budget, try to spend as much as possible money and show remaining balance at the end**.
    - **Use proper HTML tags**: <h2>, <h3>, <p>, <ul>, <li>, etc.
    - **DO NOT include <head> or <body> tags**.
    - **Add comma , on > 1000 number
    - **Ensure all elements are properly structured in a compact way, without unnecessary newlines (\\n).**
    - **Do NOT include Gemini response notes or disclaimers.** 
    - **Provide a short description in each option after its header.**
    - **List each activity/place in bullet points to make it clear and easy to read.**
    `;

    const response = await axios.post(
      url,
      {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // ✅ ดึงข้อความที่ AI ตอบกลับมา
    let htmlResponse = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "<p>No response from AI</p>";

    // ✅ Remove new lines (\n)
    htmlResponse = htmlResponse.replace(/\n/g, '');

    // ✅ Remove <head> and <body> if they exist
    htmlResponse = htmlResponse.replace(/<\/?(head|body)[^>]*>/g, '');

    // ✅ Remove triple backticks (```) and "html" at the beginning if they exist
    htmlResponse = htmlResponse.replace(/^```html|```/g, '').trim();

    console.log("Cleaned Gemini Response (HTML):", htmlResponse);
    res.json({ msg: htmlResponse });

  } catch (error) {
    console.error("Google Gemini AI Error:", error.response?.data || error.message);
    
    res.status(error.response?.status || 500).json({
      error: error.response?.data?.error?.message || "Internal Server Error"
    });
  }
};

// ✅ Home page for AI Section
const aiPage = (req, res) => {
  res.send("Welcome to AI Section!");
};

module.exports = { aiChat, aiPage };
