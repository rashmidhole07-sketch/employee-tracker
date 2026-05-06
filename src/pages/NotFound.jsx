import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="text-center mt-5">

      <h1>404</h1>
      <h4>Page Not Found</h4>

      <Link to="/" className="btn btn-primary mt-3">
        Go to Dashboard
      </Link>

    </div>
  );
};

export default NotFound;