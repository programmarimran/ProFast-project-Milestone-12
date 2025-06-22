import { Link } from "react-router";
import { AlertTriangle } from "lucide-react";
import { FaBackward } from "react-icons/fa6";
import { use } from "react";
import ServiceContext from "../../contexts/ServiceContext";

const InternalError = () => {
  const {darkIstrue}=use(ServiceContext)
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-center px-4">
      <div className="max-w-md">
        <div className="text-red-500 mb-4 flex justify-center items-center">
          <AlertTriangle size={48} />
        </div>

        <h1 className="text-5xl font-bold text-error mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">
          {" "}
          Current Details Page <br /> Not Found
        </h2>
        <p className="text-base-content mb-6">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link to={-1}>
          <button
            className={` flex items-center gap-2 mt-4 px-6 py-2 rounded font-medium transition ${
              darkIstrue
                ? "bg-blue-600 hover:bg-blue-500 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            <FaBackward size={20} /> Go Back
          </button>
        </Link>
      </div>
    </div>
  );
};

export default InternalError;
