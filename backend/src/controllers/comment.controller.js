const Comment = require("../Models/comment.model.js");

// GET comments by storyId
const getCommentsByStory = async (req, res) => {
  try {
    const comments = await Comment.find({
      storyId: req.params.storyId
    }).sort({ createdAt: 1 });

    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getCommentsByStory
};