import React from "react";
import { Link, NavLink } from "react-router";
import ProFastLogo from "./proFastLogo/ProFastLogo";
import useAuth from "../hooks/useAuth";
import NavToggle from "../components/theme/NavToggle";
import { FaPersonBiking } from "react-icons/fa6";
// import NavToggle from "../hooks/NavToggle";
const Navbar = () => {
    const navLinkClasses =
    "flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all duration-200 hover:bg-purple-200 dark:hover:bg-purple-800";

  const activeClass = "bg-purple-300 dark:bg-purple-700";
  const { logout, user } = useAuth();
  const links = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/add-parcel"}>Add Parcel</NavLink>
      </li>
      <li>
        <NavLink to={"/coverage"}>Covarage</NavLink>
      </li>
      <li>
        <NavLink>About us</NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/be-a-rider"
          className={({ isActive }) =>
            `${navLinkClasses} ${isActive ? activeClass : ""}`
          }
        >
          <FaPersonBiking /> Be A Rider
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink to={"/dashboard"}>Dashboard</NavLink>
        </li>
      )}
    </>
  );
  return (
    <div className="navbar sticky top-0 z-10 bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <ProFastLogo></ProFastLogo>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        <NavToggle></NavToggle>
        {user ? (
          <button onClick={() => logout()} className="btn">
            Logout
          </button>
        ) : (
          <Link to={"/login"}>
            <button className="btn">Login</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
