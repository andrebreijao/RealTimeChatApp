import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { formatMessage } from './utils/message.js'
import { userJoin, getCurrentUser, userLeave } from './utils/users.js';
import { users } from './utils/users.js'

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

  //Connect to a specific room
  socket.on('joinRoom', ({ userName, room }) => {
    const user = userJoin(socket.id, userName, room);
    socket.join(user.room);

    //sent a message to the single client that trigged the event
    socket.emit('banana', formatMessage(botName, 'Welcome to Chat Cord!'));

    //All clients except the one that is connecting
    //broadcast when a user join the chat 
    // socket.broadcast.emit('banana', formatMessage(botName, 'A user has joined the chat!'));

    //broadcast to a specific room
    socket.broadcast.to(user.room).emit('banana', formatMessage(botName, `${user.userName} has joined the chat!`));
  });

  //All the client in general
  //io.emit();


  //listen to chat messages from the frontend
  socket.on('banana', msg => {
    const user = getCurrentUser(socket.id);


    io.to(user.room).emit('banana', formatMessage(user.userName, msg))
  });

  //Runs when the user disconnect
  socket.on('disconnect', () => {
    const user = userLeave(socket.id)

    if (user) {
      io.to(user.room).emit('banana', formatMessage(botName, `${user.userName} has left the chat!`))
    }
  });

});

httpServer.listen(5000, () => { 'server is listening on port 5000' });
