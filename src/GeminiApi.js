// src/GeminiApi.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// Load API key from .env
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// Function to generate response
export const generateGeminiResponse = async (prompt) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"  });

  try {
    // Gemini expects prompt as an array of parts
    const result = await model.generateContent([prompt]);
    const response = await result.response;
    // console.log(response.text());
    return response.text();
  } catch (error) {
    console.error("Gemini API error:", error);
    return "❌ Gemini API failed. Please check your prompt or API key.";
  }
};
