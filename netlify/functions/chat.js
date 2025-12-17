// netlify/functions/chat.js
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export default async function handler(req) {
  try {
    const { prompt } = JSON.parse(req.body);

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1024,
    });

    // Return as Response object
    return new Response(
      JSON.stringify({ reply: completion.choices[0]?.message?.content }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Function error:", err);

    return new Response(JSON.stringify({ error: "LLM failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
