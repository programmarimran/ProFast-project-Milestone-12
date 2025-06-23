import React from "react";
import { Outlet } from "react-router";
import authImage from "../assets/authImage.png";
import ProFastLogo from "../shared/proFastLogo/ProFastLogo";

const AuthLayout = () => {
  return (
    <div className="card p-11 mx-auto lg:card-side bg-base-100 shadow-sm">
      
      <div className=" flex-1">
        <ProFastLogo></ProFastLogo>
        <Outlet></Outlet>
      </div>
      <figure className=" flex-1">
        <img src={authImage} alt="Album" />
      </figure>
    </div>
  );
};

export default AuthLayout;
