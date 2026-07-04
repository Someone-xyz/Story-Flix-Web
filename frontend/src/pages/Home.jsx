import { useEffect, useState } from "react";
import { getAllStories } from "../services/storyApi";
import StoryCard from "../components/StoryCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import "../pagescss/Home.css";

function Home() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchStories();
  }, []);

  // Shuffle Function
  const shuffleArray = (array) => {
    const newArray = [...array];

    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }

    return newArray;
  };

  async function fetchStories() {
    try {
      const data = await getAllStories();
      setStories(shuffleArray(data.stories));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const filteredStories = stories.filter((story) => {
    return (
      story.title.toLowerCase().includes(search.toLowerCase()) ||
      story.storyDescription?.toLowerCase().includes(search.toLowerCase()) ||
      story.author?.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <>
      <Navbar />

      <Hero />

      <div className="home-container">
        <SearchBar search={search} setSearch={setSearch} />

        <h1>All Stories</h1>

        {loading ? (
          <Loader />
        ) : (
          <div className="grid">
            {filteredStories.length > 0 ? (
              filteredStories.map((story) => (
                <StoryCard key={story._id} story={story} />
              ))
            ) : (
              <h2>No Story Found.</h2>
            )}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Home;