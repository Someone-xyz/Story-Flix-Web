import Navbar from "../components/Navbar";
import useAuth from "../hooks/useAuth";
import { deleteUser } from "../services/userApi";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { userId, logout } = useAuth();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteUser(userId);
      logout();
      navigate("/register");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="dash">
      <Navbar />
      <h1>Dashboard</h1>

      <p>User ID: {userId}</p>

      <button onClick={() => navigate("/upload/story")}>
        Upload Story
      </button>

      <button onClick={handleDelete}>
        Delete Account
      </button>

      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;