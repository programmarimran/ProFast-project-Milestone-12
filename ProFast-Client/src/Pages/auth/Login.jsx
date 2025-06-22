import React, { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoMdEyeOff } from "react-icons/io";
import Lottie from "lottie-react";
import loginAnimation from "../../assets/loginAnimation.json";
import AuthContext from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import SocialLogin from "./SocialLogin";
const Login = () => {
  const location = useLocation();
  const from = location?.state;
  // console.log(location)
  // console.log(location.state)
  const navigate = useNavigate();
  const [show, setShow] = useState(true);
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { loginUser, setLoading,setUser } = use(AuthContext);
  const handleLoginUser = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const userData = Object.fromEntries(formData.entries());
    const { email, password } = userData;
    //  Password authentication start with regular expression
    const uppercaseRegex = /^(?=.*[A-Z]).{1,}$/;
    const lowercaseRegex = /^(?=.*[a-z]).{1,}$/;
    const passwordLength = /^.{6,}$/;
    if (!uppercaseRegex.test(password)) {
      setPasswordError("Please minimum 1 character Upercase");
      setError("");
      return;
    } else if (!lowercaseRegex.test(password)) {
      setPasswordError("Please minimum 1 character Lowercase");
      setError("");
      return;
    } else if (!passwordLength.test(password)) {
      setPasswordError("Please Your password minimum 6 character");
      setError("");
      return;
    } else {
      setPasswordError("");
    }
    loginUser(email, password)
      .then((result) => {
        // console.log(result.user);
        if (result.user) {
          setUser(result.user)
          toast.success(
            `${
              from
                ? "Logged in successfully! Redirecting to your previous page..."
                : "Login successfully! Redirecting to home page..."
            }`
          );
          navigate(`${from || "/"}`);
        }
      })
      .catch((error) => {
        // console.error("Firebase Auth Error:", error.code, error.message);

        switch (error.code) {
          case "auth/invalid-credential":
            setError("Invalid email or password. Please check and try again.");
            break;
          case "auth/user-not-found":
            setError("No user found with this email. Please sign up first.");
            break;
          case "auth/wrong-password":
            setError("Incorrect password. Please try again.");
            break;
          case "auth/email-already-in-use":
            setError(
              "This email is already registered. Please login or use another email."
            );
            break;
          case "auth/too-many-requests":
            setError(
              "Too many login attempts. Please wait and try again later."
            );
            break;
          case "auth/network-request-failed":
            setError("Network error. Please check your internet connection.");
            break;
          case "auth/invalid-email":
            setError("Invalid email format. Please enter a valid email.");
            break;
          case "auth/user-disabled":
            setError("This account has been disabled. Please contact support.");
            break;
          default:
            setError("An unexpected error occurred. Please try again.");
        }
      })

      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="py-12">
      <div className="card mx-auto  bg-base-100 border border-gray-200  w-full  shrink-0 shadow-2xl">
        <form onSubmit={handleLoginUser} className="card-body">
          <div>
            {from && (
              <h1 className=" text-center border border-[#2F80ED] text-[#2F80ED] text-lg rounded-2xl p-4 m-4 bg-[#2F80ED10]">
                Please log in to access all features.
              </h1>
            )}
          </div>
          <h1 className="text-3xl text-center font-bold mb-8 ">Login now!</h1>
          <div className=" md:flex">
            <div className=" flex-1 flex flex-col justify-center items-center">
              <div className="rounded-2xl">
                <Lottie
                  className=" rounded-2xl overflow-hidden w-[200px] md:w-[250px]"
                  animationData={loginAnimation}
                  loop={true}
                />
              </div>
              <div className=" text-center border border-[#2F80ED] rounded-2xl p-4 m-4 bg-[#2F80ED10]">
                <h1 className=" text-[#2F80ED]"> Don't have an account?</h1>
                <h1>
                  {" "}
                  <span className=" text-[#2F80ED]">Please</span>
                  <Link
                    state={location?.state}
                    to={"/auth/signup"}
                    className=" ml-2 text-2xl font-extrabold text-blue-500 underline"
                  >
                    SignUp
                  </Link>
                </h1>
              </div>
            </div>
            <div className=" flex-1">
              <fieldset className=" fieldset">
                <SocialLogin from={from}></SocialLogin>
              </fieldset>
              <div className="flex my-5 items-center gap-2 w-full">
                <hr className="flex-grow border-2 border-gray-300 border-dashed" />
                <span className="text-gray-500 font-semibold">OR</span>
                <hr className="flex-grow border-2 border-gray-300 border-dashed" />
              </div>
              <fieldset className="fieldset">
                {/* email */}
                <label className="label">Email</label>
                <input
                  type="email"
                  required
                  className="input bg-[#2F80ED20] w-full"
                  name="email"
                  placeholder="Enter Your Email"
                />

                {/* password */}
                <label className="label">Password</label>
                <div className=" flex relative">
                  <input
                    type={show ? "password" : "text"}
                    name="password"
                    className="input w-full"
                    placeholder="Password"
                    required
                  />
                  <button
                    onClick={() => setShow(!show)}
                    type="button"
                    className=" absolute top-[16%] right-5"
                  >
                    {show ? (
                      <MdOutlineRemoveRedEye size={30} />
                    ) : (
                      <IoMdEyeOff size={30} />
                    )}
                  </button>
                </div>
                <p className=" text-error my-3 text-sm">{passwordError}</p>
                <button className="btn bg-[#2F80ED80] mt-4">Login</button>
              </fieldset>
            </div>
          </div>
          <div className=" text-center">
            <p className=" text-error my-3">{error}</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
