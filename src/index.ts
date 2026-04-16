import { PORT } from "./constants/root.constant";
import { addPlayerToRoom, createRoom, getRoom } from "./rooms/room.store";
import { createServer } from "./server";
import { generateRoomCode } from "./utils/generateCode";

const { httpServer, io } = createServer();

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // 🔹 создание комнаты
  socket.on("create_room", ({ name }, callback) => {
    const roomId = generateRoomCode();

    const room = createRoom(roomId);

    const player = {
      id: socket.id,
      name,
    };

    room.players.push(player);

    socket.join(roomId);

    callback({ roomId });
  });

  // 🔹 вход в комнату
  socket.on("join_room", ({ roomId, name }, callback) => {
    const room = getRoom(roomId);

    if (!room) {
      return callback({ error: "Room not found" });
    }

    const player = {
      id: socket.id,
      name,
    };

    addPlayerToRoom(roomId, player);

    socket.join(roomId);

    // уведомляем всех
    io.to(roomId).emit("player_joined", room.players);

    callback({ success: true, players: room.players });
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
