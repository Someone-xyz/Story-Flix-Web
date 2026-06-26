import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function ProtectedRoute({ children }) {

  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/register" />;
  }

  return children;
}

export default ProtectedRoute;