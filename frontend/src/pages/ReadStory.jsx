import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getStoryById,
  likeStory,
  dislikeStory,
} from "../services/storyApi";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import StoryComments from "../components/StoryComments";

import useAuth from "../hooks/useAuth";

import { AiFillLike, AiFillDislike } from "react-icons/ai";

import "../pagescss/ReadStory.css";

function ReadStory() {
  const { id } = useParams();

  const { userId } = useAuth();

  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStory();
  }, [id]);

  async function fetchStory() {
    try {
      const data = await getStoryById(id);
      setStory(data.story);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const handleLike = async () => {
    try {
      await likeStory(id);
      fetchStory();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDislike = async () => {
    try {
      await dislikeStory(id);
      fetchStory();
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <Loader />
        <Footer />
      </>
    );
  }

  if (!story) {
    return (
      <>
        <Navbar />
        <h2 style={{ textAlign: "center", marginTop: "50px" }}>
          Story not found
        </h2>
        <Footer />
      </>
    );
  }

  const liked = story.likes?.includes(userId);
  const disliked = story.dislikes?.includes(userId);

  return (
    <>
      <Navbar />

      <div className="container">

        <img
          src={story.bookCover}
          alt={story.title}
        />

        <h1 className="story-Title">
          {story.title}
        </h1>

        <h3>
          By {story.author}
        </h3>

        {/* LIKE / DISLIKE */}

        <div
          style={{
            display: "flex",
            gap: "20px",
            margin: "20px 0",
            alignItems: "center",
          }}
        >
          <button
            onClick={handleLike}
            style={{
              background: liked ? "#0d6efd" : "#eee",
              color: liked ? "#fff" : "#000",
              border: "none",
              padding: "10px 20px",
              cursor: "pointer",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <AiFillLike />
            {story.likes?.length || 0}
          </button>

          <button
            onClick={handleDislike}
            style={{
              background: disliked ? "#dc3545" : "#eee",
              color: disliked ? "#fff" : "#000",
              border: "none",
              padding: "10px 20px",
              cursor: "pointer",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <AiFillDislike />
            {story.dislikes?.length || 0}
          </button>
        </div>

        <div className="story--Content">
          {story.storyContent}
        </div>

      </div>

      <StoryComments
        storyId={story._id}
        currentUser={{
          _id: userId,
          username: "User",
        }}
      />

      <Footer />
    </>
  );
}

export default ReadStory;