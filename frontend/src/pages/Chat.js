import React, { useEffect, useState } from "react";
import { useAuth } from "../providers/auth";
import { sendMessage, socket } from '../connection/socket'



export default function Chat() {
  //let [searchParams, setSearchParams] = useSearchParams();
  // const user = searchParams.get("username") || "";

  const { userInfo } = useAuth();

  //Page State
  const [msg, setMsg] = useState("")
  const [chatMessages, setChatMessages] = useState([]);

  const kiko = (e) => {
    e.preventDefault();
    console.log(chatMessages)
  };

  const getMessage = (e) => {
    setMsg(e.target.value)
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (msg !== '') {
      //send message to the server
      sendMessage(msg);

      //clear the msg
      setMsg('');
    }
  };

  useEffect(
    () => {
      //listen to server messages
      socket.on("banana", (message) => {
        console.log(message);
        setChatMessages([...chatMessages, message])
      });
    });


  return (
    <div className="chat-container">
      <button className="btn" onClick={kiko}>Button Teste</button>
      <header className="chat-header">
        <h1><i className="fas fa-smile"></i> ChatCord</h1>
        <a href="index.html" className="btn">Leave Room</a>
      </header>
      <main className="chat-main">
        <div className="chat-sidebar">
          <h3><i className="fas fa-comments"></i> Room Name:</h3>
          <h2 id="room-name">JavaScript</h2>
          <h3><i className="fas fa-users"></i> Users</h3>
          <ul id="users">
            <li>Brad</li>
            <li>John</li>
            <li>Mary</li>
            <li>Paul</li>
            <li>Mike</li>
          </ul>
        </div>
        <div className="chat-messages">
          {chatMessages.map((msg, key) => {
            return (
              <div className="message" key={key}>
                < p className="meta" > {msg.userName} < span >{msg.time}</span></p>
                <p className="text">
                  {msg.text}
                </p>
              </div>
            )
          })}
        </div >
      </main >
      <div className="chat-form-container">
        <form id="chat-form">
          <input
            id="msg"
            type="text"
            placeholder="Enter Message"
            required
            autoComplete="off"
            value={msg}
            onChange={getMessage}
          />
          <button className="btn" onClick={handleSubmit}><i className="fas fa-paper-plane"></i> Send</button>
        </form>
      </div>
    </div >
  )
}
