import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

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

  const fetchVideos = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/video/get/vid"
      );

      setVideos(res.data.videos);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // Search filter
  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="navBar">
        <Navbar />
      </div>

      <SearchBar search={search} setSearch={setSearch} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
          gap: "20px",
          padding: "20px",
        }}
      >
        {filteredVideos.length > 0 ? (
          filteredVideos.map((video) => {
            const youtubeId = getYoutubeId(video.videoUrl);

            return (
              <div
                key={video._id}
                onClick={() => navigate(`/see/story/${video._id}`)}
                style={{
                  cursor: "pointer",
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                {youtubeId ? (
                  <img
                    src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
                    alt={video.title}
                    style={{
                      width: "100%",
                      height: "220px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <video
                    src={video.videoUrl}
                    muted
                    style={{
                      width: "100%",
                      height: "220px",
                      objectFit: "cover",
                    }}
                  />
                )}

                <div style={{ padding: "10px" }}>
                  <h3>{video.title}</h3>
                </div>
              </div>
            );
          })
        ) : (
          <h2 style={{ textAlign: "center", gridColumn: "1/-1" }}>
            No videos found
          </h2>
        )}
      </div>
    </>
  );
};

export default Videos;