// netlify/functions/chat.js
import Groq from "@anthropic-ai/sdk"; // or Anthropic if you use their latest SDK

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export default async function handler(req) {
  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json" },
      });
    }

    const bodyText = await req.text();
    const body = bodyText ? JSON.parse(bodyText) : {};
    const { prompt } = body;

    if (!prompt) {
      return new Response(JSON.stringify({ error: "No prompt provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const completion = await client.completions.create({
      model: "llama-3.1-8b-instant",
      prompt,
      max_tokens: 1024,
      temperature: 0.7,
    });

    return new Response(
      JSON.stringify({ reply: completion.completion }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Function error:", err);
    return new Response(
      JSON.stringify({ error: err.message || "LLM failed" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
