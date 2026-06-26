import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="container">
      <h1>404 - Page Not Found</h1>

      <Link to="/">Go Home</Link>
    </div>
  );
}

export default NotFound;