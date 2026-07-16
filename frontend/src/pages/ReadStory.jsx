import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getStoryById } from "../services/storyApi";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import StoryComments from "../components/StoryComments";

import useAuth from "../hooks/useAuth";

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