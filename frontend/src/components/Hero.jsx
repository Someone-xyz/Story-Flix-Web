import "./Hero.css";
// import SearchBar from './SearchBar';

function Hero() {
  return (
    <section className="hero">
      <div className="overlay"></div>

      <div className="hero-content">
        <span className="hero-tag">StoryVerse</span>

        <h1>STORY FLIX</h1>

        <h1>
          Unlimited <span>Stories</span>, Adventures &
          Imagination.
        </h1>

        <p>
          Discover thousands of amazing stories written by talented
          writers around the world. Read, explore and enjoy.
        </p>
        {/* <SearchBar /> */}
        <button className="hero-btn">
          Explore Stories
        </button>
      </div>
    </section>
  );
}

export default Hero;