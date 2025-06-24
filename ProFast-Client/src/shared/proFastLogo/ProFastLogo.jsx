import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router";
const ProFastLogo = () => {
  return (
    <Link to={"/"}>
      <div>
        <div className=" flex items-center">
          <img className=" -mr-4 mb-5" src={logo} alt="" />
          <p className=" text-3xl font-extrabold">ProFast</p>
        </div>
      </div>
    </Link>
  );
};

export default ProFastLogo;
