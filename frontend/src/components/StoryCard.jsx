import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AiFillLike,
  AiFillDislike
} from "react-icons/ai";

import {
  likeStory,
  dislikeStory,
} from "../services/storyApi";

import "../componentscss/StoryCard.css";

function StoryCard({ story }) {
  const navigate = useNavigate();

  const [likes, setLikes] = useState(story.likes || []);
  const [dislikes, setDislikes] = useState(story.dislikes || []);

  const handleLike = async (e) => {
    e.stopPropagation();

    try {
      await likeStory(story._id);

      // Refresh ke bina UI update
      if (likes.includes("me")) {
        setLikes(likes.filter((id) => id !== "me"));
      } else {
        setLikes([...likes, "me"]);
        setDislikes(dislikes.filter((id) => id !== "me"));
      }
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  const handleDislike = async (e) => {
    e.stopPropagation();

    try {
      await dislikeStory(story._id);

      if (dislikes.includes("me")) {
        setDislikes(dislikes.filter((id) => id !== "me"));
      } else {
        setDislikes([...dislikes, "me"]);
        setLikes(likes.filter((id) => id !== "me"));
      }
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <div
      className="story-card"
      onClick={() => navigate(`/read/story/${story._id}`)}
    >
      {/* IMAGE */}
      <img
        src={story.bookCover}
        alt={story.title}
      />

      {/* CONTENT */}
      <div className="story-card-content">
        <h2 className="story-title">
          {story.title}
        </h2>

        <p className="story-desc">
          {story.storyDescription}
        </p>

        <p className="story-author">
          Author: {story.author}
        </p>

        {/* LIKE / DISLIKE */}
        <div
          className="story-reactions"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="like-btn"
            onClick={handleLike}
          >
            <AiFillLike />
            <span>{likes.length}</span>
          </button>

          <button
            className="dislike-btn"
            onClick={handleDislike}
          >
            <AiFillDislike />
            <span>{dislikes.length}</span>
          </button>
        </div>

        <div className="read-btn">
          Click to read story
        </div>
      </div>
    </div>
  );
}

export default StoryCard;