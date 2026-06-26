const Comment = require("../Models/comment.model.js");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected");

    socket.on("joinStory", (storyId) => {
      socket.join(storyId);
    });

    socket.on("sendComment", async (data) => {
      try {
        const comment = await Comment.create({
          storyId: data.storyId,
          userId: data.userId,
          username: data.username,
          message: data.message
        });

        io.to(data.storyId).emit("newComment", comment);
      } catch (err) {
        console.log(err);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};