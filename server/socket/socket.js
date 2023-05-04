import { Server } from "socket.io";

const io = new Server(4000, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  },
});

const socket = () => {
  io.on("connection", (socket) => {
    console.log(`User connected ${socket.id}`);

    // socket.on("new-message", (msg) => {
    //   console.log(`message: ${msg}`);
    //   io.emit("new-message", msg);
    // });
  

    socket.on("disconnect", () => {
      console.log(`User disconnected ${socket.id}`);
    });
  });
};

export default socket;
