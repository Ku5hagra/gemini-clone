import React, { useContext, useState } from 'react'
import './sidebar.css'
import {assets} from '../../assets/assets'
import { Context } from '../../context'
const Sidebar = () => {
const [extended, setExtended]=useState(false);
const {onSent, prevPrompt, newChat} = useContext(Context);

const clickhandler=()=>{
    setExtended(!extended);
}

  return (
    <div className='sidebar'>
        <div className="top">
            <img onClick={clickhandler} className='menu' src={assets.menu_icon} alt="" />
            <div className="new-chat" onClick={()=>{newChat()}}>
                <img src={assets.plus_icon} alt="" />
                {extended && <p>New Chat</p>}
            </div>
            {extended&&<div className="recent">
                <p className="recent-title">Recent</p>
                {prevPrompt.map((item)=>{
                    return(
                        <div key={item} className="recent-entry" onClick={()=>{onSent(item)}}>
                    <img src={assets.message_icon} alt="" />
                    <p>{item.slice(0,18)}..</p>
                </div>
                    )
                })
                }
                
            </div>}
        </div>
        <div className="bottom">
            <div className="bottom-item recent-entry">
                <img src={assets.question_icon} alt="" />
                {extended?<p>Help</p>:null}
            </div>
            <div className="bottom-item recent-entry">
                <img src={assets.history_icon} alt="" />
                {extended?<p>Activity</p>:null}
            </div>
            <div className="bottom-item recent-entry">
                <img src={assets.setting_icon} alt="" />
                {extended?<p>Setting</p>:null}
            </div>
        </div>
    </div>
  )
}

export default Sidebar