import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const SingleVideo = () => {
  const { id } = useParams();

  const [video, setVideo] = useState(null);

  const getYoutubeId = (url) => {
    try {
      const parsed = new URL(url);

      if (parsed.hostname.includes("youtu.be")) {
        return parsed.pathname.slice(1);
      }

      if (
        parsed.hostname.includes("youtube.com") ||
        parsed.hostname.includes("www.youtube.com")
      ) {
        return parsed.searchParams.get("v");
      }

      return null;
    } catch {
      return null;
    }
  };

  const fetchVideo = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/video/get/vid/${id}`
      );

      setVideo(res.data.video);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchVideo();
  }, [id]);

  if (!video) return <h2>Loading...</h2>;

  const youtubeId = getYoutubeId(video.videoUrl);

  return (
    <>
      <div className="video-container">
        <Navbar />
      </div>

      <div
        style={{
          maxWidth: "900px",
          margin: "20px auto",
        }}
      >
        {youtubeId ? (
          <iframe
            width="100%"
            height="500"
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              border: "none",
              borderRadius: "10px",
            }}
          />
        ) : (
          <video
            src={video.videoUrl}
            controls
            autoPlay
            style={{
              width: "100%",
              borderRadius: "10px",
            }}
          />
        )}

        <h1>{video.title}</h1>

        <p>{video.description}</p>
      </div>
    </>
  );
};

export default SingleVideo;