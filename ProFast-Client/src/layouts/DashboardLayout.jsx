import React from "react";
import { NavLink, Outlet } from "react-router";
import ProFastLogo from "../shared/proFastLogo/ProFastLogo";

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col ">
        {/* Navbar */}
        <div className="navbar bg-base-300 dark:bg-base-100 text-base-content dark:text-white z-50 lg:hidden w-full min-h-[64px]">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2">Dashboard</div>

          {/* Optional top nav for large screen */}
          <div className="hidden flex-none lg:block">
            <ul className="menu bg-black border menu-horizontal text-white dark:text-white min-h-full w-80 p-4">
              <ProFastLogo />
              <li>
                <NavLink to={"/dashboard/myparcels"}>My Parcels</NavLink>
              </li>
              <li>
                <NavLink to={"/"}>Home</NavLink>
              </li>
            </ul>
          </div>
        </div>

        {/* content here */}
        <div>
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu border h-[calc(100vh-64px)] mt-16 lg:mt-0 bg-base-200 dark:bg-base-100 text-base-content dark:text-white min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <ProFastLogo />
          <li>
            <NavLink to={"/dashboard/myparcels"}>My Parcels</NavLink>
          </li>
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
