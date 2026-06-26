import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "../componentscss/Navbar.css";


function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Story Flix</Link>
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>

        <Link to="/videos">Videos</Link>

        {!isAuthenticated && (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}

        {isAuthenticated && (
          <>
            <Link to="/dashboard">Dashboard</Link>

            <Link to="/upload/story">
              Upload Story
            </Link>

            <Link to="/story/upload/video">
              Upload Story Video
            </Link>

            <Link to="/ai">Ai Chatbot</Link>

            <Link to="/videos">Videos</Link>

            <button onClick={logout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;