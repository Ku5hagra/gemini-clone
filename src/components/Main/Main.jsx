import React, { useState } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { generateGeminiResponse } from "../../GeminiApi";

const main = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const context = [
    {
      description: "Suggest beautiful places to see on an upcoming road trip",
      img: assets.compass_icon,
    },
    {
      description: "What is the difference between == and === in JavaScript?",
      img: assets.bulb_icon,
    },
    { description: "Write or debug code for me.", img: assets.code_icon },
    {
      description: "Briefly summarize this concept: urban planning",
      img: assets.message_icon,
    },
  ];

  const handleSend = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const res = await generateGeminiResponse(input);
    setResponse(res);
    setLoading(false);
    setInput("");
  };

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        <div className="greet">
          <p>
            <span>Hello, Kushagra</span>
          </p>
          <p>How can I help you Today</p>
        </div>
        <div className="cards">
          {context.map(({ description, img }) => (
            <div className="card" key={description}>
              <p>{description}</p>
              <img src={img} alt="" />
            </div>
          ))}
        </div>
        <div className="main-bottom">
          <div className="search-box">
            <input
              type="text"
              placeholder="Enter a prompt here"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <div onClick={handleSend} style={{ cursor: "pointer" }}>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              <img src={assets.send_icon} alt="Send" />
            </div>
          </div>

          {loading ? (
            <p style={{ marginTop: "10px", color: "#888" }}>
              Generating response...
            </p>
          ) : (
            response && <p style={{ marginTop: "10px" }}>{response}</p>
          )}

          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so
            double check its responses. Your privacy and Gemini Apps
          </p>
        </div>
      </div>
    </div>
  );
};

export default main;
