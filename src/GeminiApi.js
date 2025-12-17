// src/GeminiApi.js

export const generateGeminiResponse = async (prompt) => {
  try {
    const res = await fetch("/.netlify/functions/chat", {
      method: "POST",
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    return data.reply;
  } catch (error) {
    console.error("API error:", error);
    return "❌ Server error. Try again.";
  }
};
