import { useNavigate } from "react-router-dom";
import '../componentscss/StoryCard.css'

function StoryCard({ story }) {
  const navigate = useNavigate();

  return (
    <div
      className="story-card"
      onClick={() => navigate(`/read/story/${story._id}`)}
    >
      {/* IMAGE LEFT */}
      <img src={story.bookCover} alt={story.title} />

      {/* RIGHT CONTENT */}
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

        <div className="read-btn">
          Click to read story
        </div>

      </div>
    </div>
  );
}

export default StoryCard;