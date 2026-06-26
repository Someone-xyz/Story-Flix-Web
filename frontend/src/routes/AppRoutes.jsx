import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import UploadStory from "../pages/UploadStory";
import EditStory from "../pages/EditStory";
import ReadStory from "../pages/ReadStory";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "../components/ProtectedRoute";
import Login from "../pages/Login";
import Ai from "../pages/AI";
import VideoUpload from "../pages/VideoUpload.jsx";
import Videos from '../pages/Videos.jsx';
import SingleVideo from "../pages/SeeStory.jsx";

function AppRoutes() {
  return (
    <Routes>

      {/* Public Routes */}

      <Route path="/" element={<Home />} />

      <Route
        path="/read/story/:id"
        element={<ReadStory />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route path="/ai" element={<Ai />} />

      <Route path="/story/upload/video" element={<VideoUpload />} />
      
      <Route path="/videos" element={<Videos />} />

      < Route path="/see/story/:id" element={<SingleVideo />} />

      {/* Protected Routes */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/upload/story"
        element={
          <ProtectedRoute>
            <UploadStory />
          </ProtectedRoute>
        }
      />

      

      <Route
        path="/edit/story/:id"
        element={
          <ProtectedRoute>
            <EditStory />
          </ProtectedRoute>
        }
      />

      <Route
        path="/login"
        element={<Login />}
      />

      {/* 404 */}

      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>
  );
}

export default AppRoutes;