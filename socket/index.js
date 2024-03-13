const io = require("socket.io")(8800, {
  cors: {
    origin: "http://localhost:5173",
  },
});

let activeUsers = [];

io.on("connection", (socket) => {
  // save new connected user
  socket.on("new-user-add", (newUserId) => {
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({
        userId: newUserId,
        socketId: socket.id,
      });
    }

    console.log("connected", activeUsers);
    io.emit("get-users", activeUsers);
  });

  socket.on("send-message", (data) => {
    const { receiverId } = data;
    const user = activeUsers.find((user) => user.userId === receiverId);
    console.log("Sending from socket to :", receiverId);
    console.log("Data: ", data);
    console.log("activeUsers", activeUsers);
    console.log("receiverId", receiverId);
    console.log(user);
    if (user) {
      io.to(user.socketId).emit("recieve-message", data);
    }
  });

  socket.on("disconnect", () => {
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    console.log("disconnected", activeUsers);
    io.emit("get-users", activeUsers);
  });

  socket.on("loggedOut", (userId) => {
    activeUsers = activeUsers.filter((user) => user.userId !== userId);
    console.log("disconnected", activeUsers);
    io.emit("get-users", activeUsers);
  });

  socket.on("new-chat", () => {
    console.log("update chats");
    io.emit("get-chats");
  });

  socket.on("block-user", (blockedUserId) => {
    console.log("block-user");
    io.emit("logOutBlockedUser", blockedUserId);
  });
});
