import { useState } from "react";
import { createContext } from "react";
import { generateGeminiResponse } from "./GeminiApi";

export const Context = createContext();
const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setrecentPrompt] = useState("");
  const [prevPrompt, setprevPrompt] = useState([]);
  const [showResult, setshowResult] = useState(false);
  const [loading, setloading] = useState(false);
  const [resultData, setresultData] = useState("");


  const onSent = async (prompt) => {
//here i used the onSent function in two ways 
// once with a parameter that is used in the sidebar.jsx 'onSent(prompt)'--> here it takes some value of the prompt from the input so runs else condition
// and once without parameter that is used in Main.jsx 'onSent()'--> here it takes the prompt to be undefined so it runs if condition

    console.log(prompt);
    console.log(input);

  setresultData("");
  setloading(true);
  setshowResult(true);
  let response;

  if(prompt===undefined){
    setprevPrompt((prev) => [...prev, input]);
    setrecentPrompt(input);
   response = await generateGeminiResponse(input);
  }
  else{
    // setprevPrompt((prev) => [...prev, prompt]);
    
response = await generateGeminiResponse(prompt);setrecentPrompt(prompt);

  }

  // setrecentPrompt(finalPrompt);
  setInput("");

  // setprevPrompt((prev) => [...prev, finalPrompt]);

  
  setloading(false);

  for (let i = 0; i < response.length; i++) {
    setTimeout(() => {
      setresultData((prev) => prev + response.charAt(i));
    }, i * 1);
  }
};
const newChat=()=>{
setloading(false);
setshowResult(false);
}
  const contextValue = {
    prevPrompt,
    setprevPrompt,
    setresultData,
    onSent,
    setrecentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    recentPrompt,
    newChat
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};
export default ContextProvider;
