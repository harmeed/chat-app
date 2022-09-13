const express = require("express");
const socket = require("socket.io");

const app = express();

const server = app.listen(2800, function () {
  console.log("server listening on port 2800,");
});

app.get("/", (req, res) => {
  res.send("Home page");
});

app.use(express.static("public"));

const io = socket(server);

io.on("connection", (socket) => {
  console.log("made socket connection", socket.id);

  socket.on("chat", function (data) {
    io.sockets.emit("chat", data);
  });
  socket.on("typing", function (data) {
    socket.broadcast.emit("typing", data);
  });
});
