const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/auth");
const messageRoute = require("./routes/message");

const app = express();
const socket = require("socket.io");

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>{
    console.log("Database Connection was successfull");
})
.catch((err)=>{
    console.log(err.message);
});

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoute);


const server = app.listen(process.env.PORT , ()=>{
    console.log(`Server started at ${process.env.PORT}`);
})

const io = socket(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });
  
  global.onlineUsers = new Map();
  io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
      onlineUsers.set(userId, socket.id);
    });
  
    socket.on("send-msg", (data) => {
      const sendUserSocket = onlineUsers.get(data.to);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-recieve", data.msg);
      }
    });
});