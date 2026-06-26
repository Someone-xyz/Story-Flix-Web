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

    async function fetchStories() {

      try {

        const data = await getAllStories();

        setStories(data.stories);

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);

      }

    }

    fetchStories();

  }, []);

  // Search Logic
  const filteredStories = stories.filter((story) =>

    story.title.toLowerCase().includes(search.toLowerCase()) ||

    story.description?.toLowerCase().includes(search.toLowerCase()) ||

    story.author?.toLowerCase().includes(search.toLowerCase())

  );

  return (
    <>
      <Navbar />

      <Hero />

      <div className="home-container">

        <SearchBar
          search={search}
          setSearch={setSearch}
        />

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