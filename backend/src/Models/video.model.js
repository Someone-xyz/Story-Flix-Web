const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'title is required'],
      trim: true
    },

    description: {
      type: String
    },

    videoUrl: {
      type: String,
      required: [true, 'videoUrl is required']
    }
  },
  {
    timestamps: true
  }
);

const videoModel = mongoose.model("Video", videoSchema);
module.exports = videoModel;