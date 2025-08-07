require("dotenv").config();
const app = require("./src/app");
const { createServer } = require("http");
const { Server } = require("socket.io");
const generateResponse = require("./src/services/ai.service");
const httpServer = createServer(app);
const { text } = require("stream/consumers");

const io = new Server(httpServer, {
  /* options */
});

const chatHistory = [];

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // chat message event
  socket.on("chat message", async (msg) => {
    chatHistory.push({
      role: "user",
      parts: [
        {
          text: msg,
        },
      ],
    });

    const response = await generateResponse(chatHistory);

    chatHistory.push({
      role: "model",
      parts: [
        {
          text: response,
        },
      ],
    });

    socket.emit("ai-response", response);
  });

  // on disconnect

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

httpServer.listen(3000, () => {
  console.log("server is running on port 3000");
});
