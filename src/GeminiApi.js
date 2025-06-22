import { GoogleGenerativeAI } from "@google/generative-ai";
const apiKey = import.meta.env ? import.meta.env.REACT_APP_GEMINI_API_KEY : process.env.REACT_APP_GEMINI_API_KEY;
console.log("API Key:", apiKey);
const genAI = new GoogleGenerativeAI(apiKey);

export const generateGeminiResponse = async (prompt) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API error:", error);
    return "Sorry, something went wrong.";
  }
};
