import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});


io.on("connection", (socket) => {

  //sent a message to the single client that trigged the event
  socket.emit('banana', 'Welcome to ChatCord!');

  //All clients except the one that is connecting
  //broadcast when a user join the chat 
  socket.broadcast.emit('banana', 'A user has joined the chat');

  //All the client in general
  //io.emit();

  //Runs when the user disconnect
  socket.on('disconnect', () => {
    io.emit('banana', "A user has left the chat")
  })

  //listen to chat messages from the frontend
  socket.on('banana', msg=>{
    io.emit('banana', msg)
  })


});

httpServer.listen(5000, () => { 'server is listening on port 5000' });
