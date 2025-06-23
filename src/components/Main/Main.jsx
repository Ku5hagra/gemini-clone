import React, { useState,useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { generateGeminiResponse } from "../../GeminiApi";
import { Context } from "../../context";
import ReactMarkdown from "react-markdown";

const main = () => {
  const {onSent, recentPrompt, showResult, loading, resultData, setInput, input}=useContext(Context)

  const ccontext = [
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

//   const handleSend = async () => {
//     if (!input.trim()) return;
//     setLoading(true);
//     const res = await generateGeminiResponse(input);
//     setResponse(res);
//     setLoading(false);
//     setInput("");
//   };

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">

        {!showResult ?
        <>
        <div className="greet">
          <p>
            <span>Hello, Kushagra</span>
          </p>
          <p>How can I help you Today</p>
        </div>
        <div className="cards">
          {ccontext.map(({ description, img }) => (
            <div className="card" key={description} onClick={()=>{onSent(description)}}>
              <p>{description}</p>
              <img src={img} alt="" />
            </div>
          ))}
        </div>
        </>
        :
        <div className="result">
            <div className="result-title">
                <img src={assets.user_icon} alt="" />
                <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
                <img src={assets.gemini_icon} alt="" />
                <div className="markdown-content">
                {loading 
                ?<div className="loader">
                    <hr />
                    <hr />
                    <hr />
                </div>
               
                : <ReactMarkdown>{resultData}</ReactMarkdown> 
                }</div>
            </div>
        </div>
        }
        <div className="main-bottom">
          <div className="search-box">
            <input
              type="text"
              placeholder="Enter a prompt here"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div  style={{ cursor: "pointer" }}>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {(input==="")?<></>:<img onClick={()=>{onSent()}} src={assets.send_icon} alt="Send" />}
              
            </div>
          </div>

  

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
