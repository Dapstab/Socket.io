//const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const http = require("http");
//const express = require("express");
const socketio = require("socket.io");
const User = require("./models/userModel");

const formatMessage = require("./utils/messages");
// const { userLeave } = require("./utils/users");

dotenv.config({ path: "./config.env" });

//const app = express();
const app = require("./app");

const DB = process.env.DATABASE_URI.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

run().catch(console.dir);

async function run() {
  try {
    const connection = await mongoose.connect(DB, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    //console.log(connection);
    console.log("Connected to db...");
  } catch (e) {
    console.error(e.message);
  }
}

const server = http.createServer(app);
const io = socketio(server);

// Set static folder
//app.use(express.static(path.join(__dirname, 'public')));

const botName = "ChatCord Bot";

// Run when client connects
io.on("connection", (socket) => {
  let user;
  //console.log("New Connection");

  socket.on("joinRoom", async ({ username }) => {
    //const user = userJoin(socket.id, username, room);
    user = await User.findOne({ name: username });
    socket.join(user.activeRoom);

    // Welcome current user
    socket.emit("message", formatMessage(botName, "Welcome to ChatCord!"));

    // Broadcast when a user connects
    socket.broadcast
      .to(user.activeRoom)
      .emit(
        "message",
        formatMessage(botName, `${user.name} has joined the chat`)
      );

    // Send users and room info
    const users = await User.aggregate([
      {
        $match: { activeRoom: user.activeRoom },
      },
      {
        $group: {
          _id: "$activeRoom",
          users: { $push: "$name" },
        },
      },
      {
        $project: { _id: 0 },
      },
    ]);
    io.to(user.activeRoom).emit("roomUsers", {
      //room: user.activeRoom,
      //users: getRoomUsers(user.activeRoom),
      users: users[0].users,
    });
  });

  // Listen for chatMessage
  socket.on("chatMessage", async (msg) => {
    //const user = ocket.id);
    //const user = await User.findOne({ name: username });
    io.to(user.activeRoom).emit("message", formatMessage(user.name, msg));
  });

  // Runs when client disconnects
  socket.on("disconnect", async () => {
    //const user = userLeave(socket.id);
    const users = await User.aggregate([
      {
        $match: { activeRoom: user.activeRoom },
      },
      {
        $group: {
          _id: "$activeRoom",
          users: { $push: "$name" },
        },
      },
      {
        $project: { _id: 0 },
      },
    ]);

    if (user) {
      io.to(user.activeRoom).emit(
        "message",
        formatMessage(botName, `${user.name} has left the chat`)
      );

      // Send users and room info
      io.to(user.activeRoom).emit("roomUsers", {
        //room: user.activeRoom,
        users: users[0].users,
      });

      await user.userLeave();
    }
  });
});

const port = process.env.PORT || 4000;

server.listen(port, () => console.log(`Server running on port ${port}`));

process.on("SIGTERM", () => {
  console.log("SIGTERM RECIVED. Shutting down gracefully");
  server.close(() => {
    console.log("Process terminated!");
  });
});
