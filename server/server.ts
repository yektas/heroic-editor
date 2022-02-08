import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { nanoid } from "nanoid";

const EVENTS = {
  CLIENT: {
    JOIN_ROOM: "JOIN_ROOM",
    NEW_MESSAGE: "NEW_MESSAGE",
  },
  SERVER: {
    JOINED_ROOM: "JOINED_ROOM",
    NEW_MESSAGE: "NEW_MESSAGE",
  },
};

const app = express();
app.use(express.json());
app.use(function (_, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

const PORT = 5000;

const ROOMS: Record<string, Set<string>> = {};

app.get("/", (req, res) => {
  res.send("<h1>Welcome to Heroic Editor server!</h1>");
});

app.post("/create-room", (req, res) => {
  const roomId = nanoid();
  ROOMS[roomId] = new Set([req.body.username]);
  console.log("Room created: ", roomId);
  res.send(roomId);
});

io.on("connection", (socket) => {
  socket.on(EVENTS.CLIENT.JOIN_ROOM, ({ username, roomId }) => {
    if (!username || !roomId) return;

    ROOMS[roomId].add(username);
    socket.join(roomId);
    socket.to(roomId).emit(EVENTS.SERVER.JOINED_ROOM, { username, roomId });
  });

  socket.on(EVENTS.CLIENT.NEW_MESSAGE, ({ roomId, username, message }) => {
    console.log(`Room ${roomId} from ${username} new message: ${message}`);
    socket
      .to(roomId)
      .emit(EVENTS.SERVER.NEW_MESSAGE, { username, roomId, message });
  });

  socket.on("disconnect", () => {
    console.log("Disconnected ", socket.id);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
