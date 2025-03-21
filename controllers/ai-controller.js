const axios = require("axios");
const { province } = require("../configs/prisma");
require("dotenv").config(); // ✅ Load env variables

const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // ✅ Use API Key from .env

const aiChat = async (req, res, next) => {
  try {
    const { budget, period, province, region, transportation, numberOfTravellers, tripType, moodAndTone } = req.body;

    console.log("User Input:", { budget, period, province, region, transportation, numberOfTravellers, tripType, moodAndTone });

    // ✅ Validate required fields
    if (!budget || !period || !province || !region || !transportation || !numberOfTravellers || !tripType || !moodAndTone || !Array.isArray(tripType)) {
      return res.status(400).json({ error: "All fields are required, and tripType must be an array." });
    }

    // ✅ Use Gemini AI API
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

    // ✅ Format budget numbers with commas
    const formattedBudget = Number(budget).toLocaleString();

    // ✅ Construct AI prompt with clean and structured formatting
    const prompt = `
    I want to plan a trip with the following details:
    - Budget: ${formattedBudget} THB
    - Trip Duration: ${period} days
    - Starting Point: ${province}
    - Region: ${region}
    - Mode of Transport: ${transportation}
    - Number of Travellers: ${numberOfTravellers}
    - Trip Type: ${tripType.join(", ")}
    - Current Mood & Tone: ${moodAndTone}
    
    Suggestion
    - spend as much as provided money
    - all number more than 999 should have comma(,)
    Format the response **in valid HTML**, ensuring:
    - Provide **3 different trip options**, clearly separated.
    - Each trip should be structured like:
      <div class="trip-option">
        <h2>Trip Option 1</h2>
        <p class="trip-description">Short trip description.</p>
        <h3>Day 1</h3> 
        <p class="activity1">Activity1 description ... cost THB or free</p>
         <p class="activity2">Activity2 description ... cost THB or free</p>
        <br>
        <h3>Day 2</h3> 
        <p class="activity3">Activity3 description ... cost THB or free</p>
        <p class="activity4">Activity4 description ... cost THB or free</p>
        <br>
        <h3>Day 3</h3> 
        <p class="activity4">Activity5 description ... cost THB or free</p>
        <p class="activity5">Activity5 description ... cost THB or free</p>
        <br>
        <h3>Conclusion</h3> 
        <p class="total-spend">Total Spend: <span class="spend">XXX THB</span></p>
        <p class="remaining-budget">Remaining Budget: <span class="budget">XXX THB</span></p>
      </div>
    - **Make border line every option in dark blur color.
    - **Remove all bullet points.**
    - **Trip Option 1 background color is light blue
    - **Trip Option 2 background color is light green
    - **Trip Option 3 background color is light orange
    - **Cost THB should be at the right side adjust it same position all line
    - **If cost = 0 THB show "free" text instead of 0 THB and green text"
    - **Make "Trip Option" header larger and more stylish.**
    - **Ensure a clean, modern, and elegant design.**
    - **Budget balance should be bold and darkgreen.**
    - **Any cost should be red color.**
    - **Seperat each activity in each day, different line**
    `;

    const response = await axios.post(
      url,
      { contents: [{ parts: [{ text: prompt }] }] },
      { headers: { "Content-Type": "application/json" } }
    );

    // ✅ Extract AI-generated response
    let htmlResponse = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "<p>No response from AI</p>";

    // ✅ Remove new lines and extra spaces
    htmlResponse = htmlResponse.replace(/\n+/g, ' ').replace(/\s{2,}/g, ' ').trim();

    // ✅ Remove unwanted <head> or <body> tags
    htmlResponse = htmlResponse.replace(/<\/?(head|body)[^>]*>/g, '');

    // ✅ Remove unnecessary triple backticks (```) and "html" at the beginning
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
