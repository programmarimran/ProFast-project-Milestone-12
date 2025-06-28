import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import LoginWithGoogle from "./socialLogin/LoginWithGoogle";
import { Link,  useNavigate } from "react-router";
const Login = () => {
 
  const navigate=useNavigate()
  const { signIn } = useAuth();
  const [error, setError] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onsubmit = (data) => {
    signIn(data.email, data.password)
      .then((result) => {
        console.log(result);
navigate("/")
      })
      .catch((error) => {
        setError(error.code);
      });
  };
  return (
    <div className="card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-5xl font-bold">Login now!</h1>
        <form onSubmit={handleSubmit(onsubmit)}>
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="input"
              placeholder="Email"
            />
            {errors?.email && (
              <span className=" text-error">{errors?.email?.message}</span>
            )}

            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "password is required",
                minLength: {
                  value: 6,
                  message: "Minimus 6 character password",
                },
              })}
              className="input"
              placeholder="Password"
            />
            {errors.password && (
              <span className=" text-error">{errors.password.message}</span>
            )}

            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-neutral mt-4">Login</button>
            {error && <span className=" text-error">{error}</span>}
            <div className=" w-full text-center">
              <LoginWithGoogle></LoginWithGoogle>
            </div>
            <p className=" text-lg my-4">
              Already have a register ? please{" "}
              <Link className=" text-primary" to={"/register"}>
                {" "}
                Register
              </Link>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Login;
