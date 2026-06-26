const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    storyId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Story"
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },

    username: {
      type: String,
      required: true
    },

    message: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Comment", commentSchema);