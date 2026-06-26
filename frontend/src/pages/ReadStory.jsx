import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStoryById } from "../services/storyApi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import "../pagescss/ReadStory.css";
import StoryComments from "../components/StoryComments";
import useAuth from "../hooks/useAuth";

function ReadStory() {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);

  const { userId } = useAuth();

  useEffect(() => {
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

    fetchStory();
  }, [id]);

  return (
    <>
      <Navbar />

      <div className="container">
        {loading ? (
          <Loader />
        ) : story ? (
          <>
            <img src={story.bookCover} alt={story.title} />
            <h1 className="story-Title">{story.title}</h1>
            <h3>By {story.author}</h3>
            <p>{story.storyDescription}</p>
            <div className="story--Content">{story.storyContent}</div>
          </>
        ) : (
          <h2>Story not found</h2>
        )}
      </div>

      {/* ✅ FIXED COMMENT COMPONENT */}
      {story && (
        <StoryComments
          storyId={story._id}
          currentUser={{
            _id: userId,
            username: "User"
          }}
        />
      )}

      <Footer />
    </>
  );
}

export default ReadStory;