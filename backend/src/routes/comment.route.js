const express = require("express");
const router = express.Router();

const {
  getCommentsByStory
} = require("../controllers/comment.controller");

// GET comments by storyId
router.get("/:storyId", getCommentsByStory);

module.exports = router;