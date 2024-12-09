const { GoogleGenerativeAI } = require("@google/generative-ai");
const { GoogleAIFileManager } = require("@google/generative-ai/server");
require("dotenv").config();

// const apiKey = process.env.GEMINI_API_KEY;
const apiKey = 'AIzaSyDv9UlHzMgoWyKDqfN3D8yss7N4Be57bjo'
const genAI = new GoogleGenerativeAI(apiKey);
const fileManager = new GoogleAIFileManager(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });

const generationConfig = {
  temperature: 2,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

async function uploadToGemini(path, mimeType) {
  try {
    const uploadResult = await fileManager.uploadFile(path, {
      mimeType,
      displayName: path.split("/").pop(),
    });

    return uploadResult.file;
  } catch (error) {
    console.error("Failed to upload file:", error);
    throw error;
  }
}

async function identifyWithAI(filePath, mimeType) {
  try {
    const uploadedFile = await uploadToGemini(filePath, mimeType);

    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {
              fileData: {
                mimeType: uploadedFile.mimeType,
                fileUri: uploadedFile.uri,
              },
            },
            {
              text: "You are a chef.\nIdentify the dish in this image and write just the name",
            },
          ],
        },
      ],
    });

    const result = await chatSession.sendMessage("Identify the dish.");
    return JSON.parse(result.response.text());
  } catch (error) {
    console.error("Error during AI processing:", error);
  }
}

async function generateRecipe(dishName) {
  const chatSession = await model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          { text: `Dish Name = ${dishName}` },
          {
            text: `Dish Name = ${dishName}
You are a professional chef. Based on the provided dish name, generate the following in JSON format:

- Title: The name of the dish.
- Ingredients: List of ingredients with quantities (e.g., '1 kg boneless chicken').
- Method: Step-by-step instructions (e.g., 'Marinate chicken with spices for 30 minutes').
- Tips: Additional cooking tips (e.g., 'Use bone-in chicken for better flavor').

Ensure the response follows this structure:

{
  "Title": "Chicken Biryani",
  "Ingredients": ["1 kg boneless chicken", "1 large onion, chopped", ...],
  "Method": ["Marinate the chicken with spices", "Cook the chicken in oil", ...],
  "Tips": ["Use bone-in chicken for better flavor", "Adjust chili according to taste", ...]
};`,
          },
        ],
      },
    ],
  });

  try {
    const result = await chatSession.sendMessage(dishName);
    return result.response.text();
  } catch (error) {
    console.error("Error generating dish details:", error);
  }
}

module.exports = {
  generateRecipe,
  identifyWithAI,
};
