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
    - each activity on each day must < 20 words
    Format the response **in valid HTML**, ensuring:
    - Include this style block at the top:
      <style>
        .trip-option {
          border: 2px solid darkblue;
          padding: 20px;
          margin-bottom: 20px;
          border-radius: 10px;
          font-family: Arial, sans-serif;
        }
        h2 {
          font-size: 28px;
          font-weight: bold;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
         h3 {
           font-size: 20px;
           font-weight: bold;
           margin-top: 16px;
            margin-bottom: 8px;
         }

        .trip-description {
          font-style: italic;
          margin-bottom: 10px;
        }
        .activity1, .activity2, .activity3, .activity4, .activity5 {
          display: flex;
          justify-content: space-between;
          margin: 4px 0;
        }
        .spend {
          color: red;
          font-weight: bold;
        }
        .budget {
          font-weight: bold;
          color: darkgreen;
        }
        .free {
          color: green;
          font-weight: bold;
        }
      </style>
    
    - Provide **3 different trip options**, clearly separated.
    - Each trip should be structured like:
    
      <div class="trip-option" style="background-color: #d9f1ff;">
        <h2>Trip Option 1 +(highlight on this option)</h2>
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
    
      <div class="trip-option" style="background-color: #ffeacc;">
        <h2>Trip Option 2 +(highlight on this option)</h2>
        <!-- similar structure -->
      </div>
    
      <div class="trip-option" style="background-color: #d9fcd9;">
        <h2>Trip Option 3 +(highlight on this option)</h2>
        <!-- similar structure -->
      </div>
    
    - **Make border line every option in dark blur color.**
    - **Remove all bullet points.**
    - **Cost THB should be at the right side, adjust it same position all line**
    - **If cost = 0 THB, show "free" instead of 0 THB and in green text**
    - **Make "Trip Option" header larger and more stylish.**
    - **Ensure a clean, modern, and elegant design.**
    - **Budget balance should be bold and darkgreen.**
    - **Any cost should be red color.**
    - **Separate each activity in each day on a different line**
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
