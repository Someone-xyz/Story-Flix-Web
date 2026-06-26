require("dotenv").config();

const http = require("http");
const { Server } = require("socket.io");

const app = require("./src/app");
const connectDB = require("./src/config/db");

connectDB();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "http://192.168.0.101:5173"
    ],
    credentials: true
  }
});

require("./src/sockets/comment.socket")(io);

const PORT = process.env.PORT || 8000;

server.listen(PORT, '0.0.0.0',() => {
  console.log(`server is listening on port ${PORT}`);
});