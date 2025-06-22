import { Link } from "react-router";
import { AlertTriangle } from "lucide-react";
import errorAnimation from "../../assets/errorAnimation.json";
import Lottie from "lottie-react";
import { FaBackward, FaHome } from "react-icons/fa";
const ExternalError = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-center px-4">
      <div className="max-w-md">
        <div>
          <Lottie
            classID=" w-[300px]"
            animationData={errorAnimation}
            loop={true}
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
          <p className="text-base-content mb-6">
            Sorry, the page you’re looking for doesn’t exist or has been moved.
          </p>
        </div>

        <div className=" mt-8 flex gap-4 justify-center items-center">
          <Link to={-1} className="btn btn-primary bg-[#2F80ED] border-none">
            <FaBackward size={20} /> Go Back
          </Link>
          <Link to="/" className="btn btn-primary bg-[#2F80ED] border-none">
            <FaHome size={20} />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExternalError;
