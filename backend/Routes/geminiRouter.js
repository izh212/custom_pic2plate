const { spawn } = require("child_process");
const multer = require("multer");
const express = require("express");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs/promises");
const axios = require("axios");
const FormData = require("form-data");
const { generateRecipe } = require("./gemini");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../uploads");
    cb(null, uploadPath); // Save files to 'uploads' directory
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file._originalname}`; // Add timestamp to filename
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

const FLASK_API_URL = "http://127.0.0.1:5000/predict";

router.post("/upload", upload.single("image"), async (req, res) => {
  const imagePath = req.file?.path;

  if (!imagePath) {
    return res.status(400).json({ error: "No image uploaded" });
  }

  try {
    const formData = new FormData();
    formData.append("image", fs.createReadStream(imagePath)); 

    const flaskResponse = await axios.post(FLASK_API_URL, formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    const dishName = flaskResponse.data.dish;

    const recipe = await generateRecipe(dishName);

    res.status(200).json({ dishName, recipe });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "An error occurred while processing the image" });
  } finally {
    await fsPromises.unlink(imagePath);
  }
});

router.post("/generate", async (req, res) => {
  const { dishName } = req.body;
  try {
    const recipe = await generateRecipe(dishName);
    console.log("Recipe generated:", recipe);
    const recipeObj = JSON.parse(recipe);
    res.status(200).json({
      dish: dishName,
      recipe: recipeObj,
    });
  } catch (error) {
    console.error("Error generating recipe:", error);
    res.status(500).json({
      error: "An error occurred while generating the recipe",
    });
  }
}
);

module.exports = router;
