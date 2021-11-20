import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { socket as connectSocket } from '../connection/socket'

function InitialPage() {

  let navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [room, setRoom] = useState('');

  const onRoomChange = (e) => {
    setRoom(e.target.value);
  }


  const handleClick = (e) => {
    e.preventDefault();

    //Socket
    //conect to server once the page loads
    const socket = connectSocket;
    //Emit message to the server
    socket.emit('joinRoom', { userName, room });

    navigate('/chat')
  }

  const getUserName = (e) => {
    setUserName(e.target.value)
  }

  // useEffect(() => { connectToServer() }, [])

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
          <button className="btn" >Button Teste</button>
        </form>
      </main>
    </div>);
}

export default InitialPage;
