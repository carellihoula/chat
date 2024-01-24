const SocketIO = require("socket.io");
const Message = require("./models/MessageModel");
const User = require("./models/UserModel");

module.exports = (http) => {
  const io = SocketIO(http, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", async (socket) => {
    console.log("a user connected " + socket.id);
    try {
      const users = await User.find({});

      //list users AND list messages
      socket.emit("usersList", users);
    } catch (error) {
      console.error(error);
    }

    const updatedMessages = await Message.find().sort("timestamp");
    socket.emit("messagesHistory", updatedMessages);

    socket.on("join", (userId) => {
      socket.join(userId);
      console.log("user " + userId);
    });

    socket.on("sendMessage", async ({ senderId, receiverId, content }) => {
      const message = new Message({
        sender: senderId,
        receiver: receiverId,
        content,
      });
      await message.save();
      console.log(message);
      socket.to(receiverId).emit("receiveMessage", message);
      //all messages
      const updatedMessages = await Message.find().sort("timestamp");
      socket.emit("messagesHistory", updatedMessages);
    });
    socket.on("disconnect", () => {
      console.log("user disconnected " + socket.id);
    });
  });

  //return io;
};
