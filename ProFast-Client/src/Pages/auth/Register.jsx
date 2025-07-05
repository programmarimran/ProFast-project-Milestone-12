import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import LoginWithGoogle from "./socialLogin/LoginWithGoogle";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import useAxiosInstance from "../../hooks/useAxiosInstance";
const Register = () => {
  const navigate = useNavigate();
  const axiosinstance = useAxiosInstance();
  const [error, setError] = useState("");
  const { createUser, updateUserProfile } = useAuth();
  const [profilePic, setProfilePic] = useState("");
  const handleUploadFile = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);
    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_Imgbb_Upload_key
      }`,
      formData
    );
    setProfilePic(res.data.data.url);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onsubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
      .then((result) => {
        if (result.user) {
          // data save mongodb
          const user = {
            email: data.email,
            role: "user",
            created_at: new Date().toISOString(),
            last_log_in: new Date().toISOString(),
          };
          axiosinstance.post(`/users`, user).then((res) => {
            console.log(res.data);
          });
          // update profile
          const userInfo = {
            displayName: data.name,
            photoURL: profilePic,
          };
          updateUserProfile(userInfo)
            .then(() => {
              console.log("user updated successfully!!");
              navigate("/");
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        setError(error.code);
      });
  };

  return (
    <div className="card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-5xl font-bold">Register now!</h1>
        <form onSubmit={handleSubmit(onsubmit)}>
          <fieldset className="fieldset">
            {/* Name */}
            <label className="label">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="input"
              placeholder="Your Name"
            />
            {errors?.name && (
              <span className=" text-error">{errors?.name?.message}</span>
            )}
            {/* Photo */}
            <label className="label">Photo</label>
            <input
              type="file"
              accept="image/*"
              name="file"
              className="input"
              onChange={handleUploadFile}
            />

            {/* email */}
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
            {/* Password */}
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
            <button className="btn btn-neutral mt-4">Register</button>
            {error && <span className=" text-error">{error}</span>}
            <div>
              <LoginWithGoogle></LoginWithGoogle>
            </div>
            <p className=" text-lg my-4">
              Already have a register ? please{" "}
              <Link className=" text-primary" to={"/login"}>
                {" "}
                singIn
              </Link>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Register;
