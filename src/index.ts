import { PORT } from "./constants/root.constant";
import { createServer } from "./server";

const { httpServer, io } = createServer();

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
});

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
