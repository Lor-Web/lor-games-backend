import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

export const createServer = () => {
  const app = express();
  app.use(cors());

  const httpServer = http.createServer(app);

  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  return { app, httpServer, io };
};
