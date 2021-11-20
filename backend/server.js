import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import {formatMessage} from './utils/message.js'

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

const botName = "Chat Cord Bot";


io.on("connection", (socket) => {

  //sent a message to the single client that trigged the event
  socket.emit('banana', formatMessage(botName, 'Welcome to Chat Cord!'));

  //All clients except the one that is connecting
  //broadcast when a user join the chat 
  socket.broadcast.emit('banana', formatMessage(botName, 'A user has joined the chat!'));

  //All the client in general
  //io.emit();

  //Runs when the user disconnect
  socket.on('disconnect', () => {
    io.emit('banana', formatMessage(botName, 'A user has joined the chat!'))
  })

  //listen to chat messages from the frontend
  socket.on('banana', msg => {
    io.emit('banana', formatMessage(botName, msg))
  })


});

httpServer.listen(5000, () => { 'server is listening on port 5000' });
