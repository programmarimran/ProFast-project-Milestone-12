// pages/Forbidden.jsx
import { Link } from "react-router";
import { FaLock } from "react-icons/fa";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="text-red-500 text-6xl flex justify-center">
          <FaLock />
        </div>
        <h1 className="text-5xl font-bold text-error">403 Forbidden</h1>
        <p className="text-gray-500">
          You don't have permission to access this page. Please contact your administrator if you think this is a mistake.
        </p>

        <Link to="/" className="btn btn-error btn-wide">
          🔙 Go to Home
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;
