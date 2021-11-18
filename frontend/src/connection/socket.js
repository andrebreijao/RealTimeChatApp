import { io } from "socket.io-client";

//connect to the server

export const connectToServer = () => {
  const socket = io("http://localhost:5000/");
  return socket;
}

export const socket = io("http://localhost:5000/");

//Emit message to the server
export const sendMessage = (msg) => {
  socket.emit('banana', msg)
}

