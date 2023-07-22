import express from "express"; //se importa el modulo de express, se agrega "type": "module" en packaje json
import http from "http";
import { Server as SocketServer } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: { origin: "http://localhost:5173" },
});

io.on("connection", (socket) => {
  console.log("client connected");

  socket.on("message", (data) => {
    console.log(data);
    socket.broadcast.emit('message', data); //al recibir el evento, esta es la respuesta a todos los clientes excp el que envía
  });
});

server.listen(3000);
console.log("Server on port", 3000);
