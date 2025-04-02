// const axios = require("axios");
// const { province } = require("../configs/prisma");
// require("dotenv").config(); // ✅ Load env variables

// const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // ✅ Use API Key from .env

// const aiChat = async (req, res, next) => {
//   try {
//     const { budget, period, province, region, transportation, numberOfTravellers, tripType, moodAndTone } = req.body;

//     console.log("User Input:", { budget, period, province, region, transportation, numberOfTravellers, tripType, moodAndTone });

//     // ✅ Validate required fields
//     if (!budget || !period || !province || !region || !transportation || !numberOfTravellers || !tripType || !moodAndTone || !Array.isArray(tripType)) {
//       return res.status(400).json({ error: "All fields are required, and tripType must be an array." });
//     }

//     // ✅ Use Gemini AI API
//     const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

//     // ✅ Format budget numbers with commas
//     const formattedBudget = Number(budget).toLocaleString();

//     // ✅ Construct AI prompt with clean and structured formatting
//     const prompt = `
//     I want to plan a trip with the following details:
//     - Budget: ${formattedBudget} THB
//     - Trip Duration: ${period} days
//     - Starting Point: ${province}
//     - Region: ${region}
//     - Mode of Transport: ${transportation}
//     - Number of Travellers: ${numberOfTravellers}
//     - Trip Type: ${tripType.join(", ")}
//     - Current Mood & Tone: ${moodAndTone}
    
//     Suggestion
//     - spend as much as provided money
//     - all number more than 999 should have comma(,)
//     - each activity on each day must < 20 words
//     Format the response **in valid HTML**, ensuring:
//     - Include this style block at the top:
//       <style>
//         .trip-option {
//           border: 2px solid darkblue;
//           padding: 20px;
//           margin-bottom: 20px;
//           border-radius: 10px;
//           font-family: Arial, sans-serif;
//         }
//         h2 {
//           font-size: 28px;
//           font-weight: bold;
//           font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//         }
//          h3 {
//            font-size: 20px;
//            font-weight: bold;
//            margin-top: 16px;
//             margin-bottom: 8px;
//          }

//         .trip-description {
//           font-style: italic;
//           margin-bottom: 10px;
//         }
//         .activity1, .activity2, .activity3, .activity4, .activity5 {
//           display: flex;
//           justify-content: space-between;
//           margin: 4px 0;
//         }
//         .spend {
//           color: red;
//           font-weight: bold;
//         }
//         .budget {
//           font-weight: bold;
//           color: darkgreen;
//         }
//         .free {
//           color: green;
//           font-weight: bold;
//         }
//       </style>
    
//     - Provide **3 different trip options**, clearly separated.
//     - Each trip should be structured like:
    
//       <div class="trip-option" style="background-color: #d9f1ff;">
//         <h2>Trip Option 1 +(highlight on this option)</h2>
//         <p class="trip-description">Short trip description.</p>
//         <h3>Day 1</h3> 
//         <p class="activity1">Activity1 description ... cost THB or free</p>
//         <p class="activity2">Activity2 description ... cost THB or free</p>
//         <br>
//         <h3>Day 2</h3> 
//         <p class="activity3">Activity3 description ... cost THB or free</p>
//         <p class="activity4">Activity4 description ... cost THB or free</p>
//         <br>
//         <h3>Day 3</h3> 
//         <p class="activity4">Activity5 description ... cost THB or free</p>
//         <p class="activity5">Activity5 description ... cost THB or free</p>
//         <br>
//         <h3>Conclusion</h3> 
//         <p class="total-spend">Total Spend: <span class="spend">XXX THB</span></p>
//         <p class="remaining-budget">Remaining Budget: <span class="budget">XXX THB</span></p>
//       </div>
    
//       <div class="trip-option" style="background-color: #ffeacc;">
//         <h2>Trip Option 2 +(highlight on this option)</h2>
//         <!-- similar structure -->
//       </div>
    
//       <div class="trip-option" style="background-color: #d9fcd9;">
//         <h2>Trip Option 3 +(highlight on this option)</h2>
//         <!-- similar structure -->
//       </div>
    
//     - **Make border line every option in dark blur color.**
//     - **Remove all bullet points.**
//     - **Cost THB should be at the right side, adjust it same position all line**
//     - **If cost = 0 THB, show "free" instead of 0 THB and in green text**
//     - **Make "Trip Option" header larger and more stylish.**
//     - **Ensure a clean, modern, and elegant design.**
//     - **Budget balance should be bold and darkgreen.**
//     - **Any cost should be red color.**
//     - **Separate each activity in each day on a different line**
//     `;


//     const response = await axios.post(
//       url,
//       { contents: [{ parts: [{ text: prompt }] }] },
//       { headers: { "Content-Type": "application/json" } }
//     );

//     // ✅ Extract AI-generated response
//     let htmlResponse = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "<p>No response from AI</p>";

//     // ✅ Remove new lines and extra spaces
//     htmlResponse = htmlResponse.replace(/\n+/g, ' ').replace(/\s{2,}/g, ' ').trim();

//     // ✅ Remove unwanted <head> or <body> tags
//     htmlResponse = htmlResponse.replace(/<\/?(head|body)[^>]*>/g, '');

//     // ✅ Remove unnecessary triple backticks (```) and "html" at the beginning
//     htmlResponse = htmlResponse.replace(/^```html|```/g, '').trim();

//     console.log("Cleaned Gemini Response (HTML):", htmlResponse);
//     res.json({ msg: htmlResponse });

//   } catch (error) {
//     console.error("Google Gemini AI Error:", error.response?.data || error.message);

//     res.status(error.response?.status || 500).json({
//       error: error.response?.data?.error?.message || "Internal Server Error"
//     });
//   }
// };

// // ✅ Home page for AI Section
// const aiPage = (req, res) => {
//   res.send("Welcome to AI Section!");
// };

// module.exports = { aiChat, aiPage };



const axios = require("axios");
const cheerio = require("cheerio");
const prisma = require("../configs/prisma");
require("dotenv").config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const thaiProvinces = [
  "Bangkok", "Krabi", "Kanchanaburi", "Kalasin", "Kamphaeng Phet",
  "Khon Kaen", "Chanthaburi", "Chachoengsao", "Chonburi", "Chainat",
  "Chaiyaphum", "Chumphon", "Chiang Rai", "Chiang Mai", "Trang",
  "Trat", "Tak", "Nakhon Nayok", "Nakhon Pathom", "Nakhon Phanom",
  "Nakhon Ratchasima", "Nakhon Si Thammarat", "Nakhon Sawan", "Nonthaburi", "Narathiwat",
  "Nan", "Bueng Kan", "Buri ram", "Pathum Thani", "Prachuap Khiri Khan",
  "Prachinburi", "Pattani", "Phra Nakhon Si Ayutthaya", "Phayao", "Phang Nga",
  "Phatthalung", "Phichit", "Phitsanulok", "Phetchaburi", "Phetchabun",
  "Phrae", "Phuket", "Maha Sarakham", "Mukdahan", "Mae Hong Son",
  "Yasothon", "Yala", "Roi Et", "Ranong", "Rayong",
  "Ratchaburi", "Lopburi", "Lampang", "Lamphun", "Loei",
  "Sisaket", "Sakon Nakhon", "Songkhla", "Satun", "Samut Prakan",
  "Samut Songkhram", "Samut Sakhon", "Sa Kaeo", "Saraburi", "Sing Buri",
  "Sukhothai", "Suphan Buri", "Surat Thani", "Surin", "Nong Khai",
  "Nong Bua Lamphu", "Ang Thong", "Amnat Charoen", "Udon Thani", "Uttaradit",
  "Uthai Thani", "Ubon Ratchathani"
];

const aiChat = async (req, res, next) => {
  try {
    const { budget, period, province, region, transportation, numberOfTravellers, tripType, moodAndTone } = req.body;

    console.log("User Input:", { budget, period, province, region, transportation, numberOfTravellers, tripType, moodAndTone });

    if (!budget || !period || !province || !region || !transportation || !numberOfTravellers || !tripType || !moodAndTone || !Array.isArray(tripType)) {
      return res.status(400).json({ error: "All fields are required, and tripType must be an array." });
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
    const formattedBudget = Number(budget).toLocaleString();

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
        <p class="trip-description">Short trip description. **Use formal names for provinces. For example, use "Nakhon Ratchasima" instead of "Khorat".**</p>
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

    let htmlResponse = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "<p>No response from AI</p>";
    htmlResponse = htmlResponse.replace(/\n+/g, ' ').replace(/\s{2,}/g, ' ').trim();
    htmlResponse = htmlResponse.replace(/<\/?(head|body)[^>]*>/g, '');
    htmlResponse = htmlResponse.replace(/^```html|```/g, '').trim();

    console.log("Cleaned Gemini Response (HTML):", htmlResponse);

    /*
    let htmlResponse = `<!DOCTYPE html> <html>  <title>Northeastern Adventure Trips</title> <style> .trip-option { border: 2px solid darkblue; padding: 20px; margin-bottom: 20px; border-radius: 10px; font-family: Arial, sans-serif; } h2 { font-size: 28px; font-weight: bold; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; } h3 { font-size: 20px; font-weight: bold; margin-top: 16px; margin-bottom: 8px; } .trip-description { font-style: italic; margin-bottom: 10px; } .activity1, .activity2, .activity3, .activity4, .activity5 { display: flex; justify-content: space-between; margin: 4px 0; } .spend { color: red; font-weight: bold; } .budget { font-weight: bold; color: darkgreen; } .free { color: green; font-weight: bold; } </style>   <div class="trip-option" style="background-color: #d9f1ff;"> <h2>Trip Option 1 (Khao Yai National Park)</h2> <p class="trip-description">Explore the lush landscapes and waterfalls of Khao Yai. Great for wildlife spotting!</p> <h3>Day 1</h3> <p class="activity1">Bangkok to Pak Chong (bus). <span style="text-align: right;"><span class="spend">150</span> THB</span></p> <p class="activity2">Explore Pak Chong Night Market. <span style="text-align: right;" class="free">free</span></p> <br> <h3>Day 2</h3> <p class="activity3">Khao Yai National Park entrance fee. <span style="text-align: right;"><span class="spend">200</span> THB</span></p> <p class="activity4">Hike to Haew Narok Waterfall. <span style="text-align: right;" class="free">free</span></p> <br> <h3>Conclusion</h3> <p class="total-spend">Total Spend: <span class="spend">350 THB</span></p> <p class="remaining-budget">Remaining Budget: <span class="budget">850 THB</span></p> </div> <div class="trip-option" style="background-color: #ffeacc;"> <h2>Trip Option 2 (Udon Thani & Red Lotus Lake)</h2> <p class="trip-description">Witness the stunning Red Lotus Lake and explore Udon Thani's cultural sights.</p> <h3>Day 1</h3> <p class="activity1">Bangkok to Udon Thani (bus). <span style="text-align: right;"><span class="spend">300</span> THB</span></p> <p class="activity2">Explore Udon Thani city center. <span style="text-align: right;" class="free">free</span></p> <br> <h3>Day 2</h3> <p class="activity3">Red Lotus Lake boat tour. <span style="text-align: right;"><span class="spend">300</span> THB</span></p> <p class="activity4">Return to Bangkok (bus). <span style="text-align: right;"><span class="spend">300</span> THB</span></p> <br> <h3>Conclusion</h3> <p class="total-spend">Total Spend: <span class="spend">900 THB</span></p> <p class="remaining-budget">Remaining Budget: <span class="budget">300 THB</span></p> </div> <div class="trip-option" style="background-color: #d9fcd9;"> <h2>Trip Option 3 (Nakhon Ratchasima Historical Sites)</h2> <p class="trip-description">Explore ancient Khmer ruins and local markets in Nakhon Ratchasima (Korat).</p> <h3>Day 1</h3> <p class="activity1">Bangkok to Nakhon Ratchasima (bus). <span style="text-align: right;"><span class="spend">200</span> THB</span></p> <p class="activity2">Visit Prasat Hin Phimai Historical Park. <span style="text-align: right;"><span class="spend">100</span> THB</span></p> <br> <h3>Day 2</h3> <p class="activity3">Explore the local Korat market. <span style="text-align: right;" class="free">free</span></p> <p class="activity4">Return to Bangkok (bus). <span style="text-align: right;"><span class="spend">200</span> THB</span></p> <br> <h3>Conclusion</h3> <p class="total-spend">Total Spend: <span class="spend">500 THB</span></p> <p class="remaining-budget">Remaining Budget: <span class="budget">700 THB</span></p> </div>  </html>`
    */

    // console.log(htmlResponse)

    const $ = cheerio.load(htmlResponse);
    const extractedProvinces = [];
    const seenProvinces = new Set();

    $(".trip-description").each((index, element) => {
      const description = $(element).text();

      thaiProvinces.forEach(provinceName => {
        if (description.includes(provinceName)) {
          if (!seenProvinces.has(provinceName)) {
            extractedProvinces.push(provinceName);
            seenProvinces.add(provinceName);
          }
        }
      });
    });

    console.log("Extracted Provinces (Unique):", extractedProvinces);

    // Update count in database
    for (const provinceName of extractedProvinces) {
      await prisma.province.update({
        where: { name: provinceName },
        data: { count: { increment: 1 } },
      });
    }

    res.json({ msg: htmlResponse, extractedProvinces: extractedProvinces });

    // update stat for ai usage
    const aiRequestData = await prisma.aiRequest.create({
      data: {
        period: Number(period),
        transportation,
        numberOfTravellers: Number(numberOfTravellers),
        budget: Number(budget),
        moodAndTone
      }
    })

    console.log('***aiRequest Data:***', aiRequestData)

  } catch (error) {
    console.error("Google Gemini AI Error:", error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data?.error?.message || "Internal Server Error"
    });
  }
};

const aiPage = (req, res) => {
  res.send("Welcome to AI Section!");
};

module.exports = { aiChat, aiPage };