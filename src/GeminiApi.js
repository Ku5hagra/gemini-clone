export const generateGeminiResponse = async (prompt) => {
  try {
    const res = await fetch("/.netlify/functions/chat", {
      method: "POST",
      body: JSON.stringify({ prompt }),
      headers: { "Content-Type": "application/json" }, // add this
    });

    const data = await res.json();
    if (data.reply) return data.reply;
    if (data.error) return `❌ ${data.error}`;
    return "❌ Unknown server error.";
  } catch (error) {
    console.error("API error:", error);
    return "❌ Server error. Try again.";
  }
};
