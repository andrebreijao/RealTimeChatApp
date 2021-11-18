import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { connectToServer } from '../connection/socket';
import { useAuth } from "../providers/auth";

function InitialPage() {

  const { userInfo, setUserInfo } = useAuth();
  let navigate = useNavigate();

  const onRoomChange = (e) => {
    console.log(e.target.value)
  }

  const handleClick = (e) => {
    e.preventDefault();

    navigate('/chat')
  }

  const getUserName = (e) => {
    setUserInfo({ name: e.target.value })
  }

  const showApplicationState = (e) => {
    e.preventDefault();
    console.log(userInfo.name)
  }

  //conect to server once the page loads
  useEffect(() => { connectToServer()},[])

  return (
    <div className="join-container">
      <header className="join-header">
        <h1><i className="fas fa-smile"></i> ChatCord</h1>
      </header>
      <main className="join-main">
        <form action="chat.html">
          <div className="form-control">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter username..."
              required
              onChange={getUserName}
            />
          </div>
          <div className="form-control">
            <label htmlFor="room">Room</label>
            <select name="room" id="room" onChange={onRoomChange}>
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="PHP">PHP</option>
              <option value="C#">C#</option>
              <option value="Ruby">Ruby</option>
              <option value="Java">Java</option>
            </select>
          </div>
          <button className="btn" onClick={handleClick}>Join Chat</button>
          <button className="btn" onClick={showApplicationState}>Button Teste</button>
        </form>
      </main>
    </div>);
}

export default InitialPage;
