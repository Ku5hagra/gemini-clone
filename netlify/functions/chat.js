// netlify/functions/chat.js

import Groq from "@anthropic-ai/sdk";

// Initialize Groq/Anthropic client with API key from environment variable
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY, // Make sure you set this in Netlify environment variables
});

export default async function handler(req) {
  try {
    // Only allow POST requests
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Get raw body and parse JSON
    const bodyText = await req.text();
    const body = bodyText ? JSON.parse(bodyText) : {};
    const { prompt } = body;

    if (!prompt) {
      return new Response(JSON.stringify({ error: "No prompt provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Call Groq/LLM API
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1024,
    });

    // Return the completion text
    return new Response(
      JSON.stringify({ reply: completion.choices[0]?.message?.content || "" }),
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
