import {
  MdHome,
  MdHistory,
  MdLocalShipping,
  MdEdit,
  MdDashboard,
} from "react-icons/md";
import { NavLink, Outlet } from "react-router";
import ProFastLogo from "../shared/proFastLogo/ProFastLogo";
import useAuth from "../hooks/useAuth";
import NavToggle from "../components/theme/NavToggle";

const DashboardLayout = () => {
  const { user } = useAuth();
  console.log(user);
  const navLinkClasses =
    "flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all duration-200 hover:bg-purple-200 dark:hover:bg-purple-800";

  const activeClass = "bg-purple-300 dark:bg-purple-700";

  return (
    <div className="drawer lg:drawer-open bg-gradient-to-bl from-[#8742bc10] to-[#36174b10] dark:from-[#8742bc20] dark:to-[#36174b30]">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Top Navbar for Mobile */}
        <div className="navbar bg-base-300 dark:bg-base-100 text-base-content dark:text-white z-50 lg:hidden min-h-[64px]">
          <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-6 h-6 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <span className="ml-2 font-semibold text-lg">Dashboard</span>
        </div>

        {/* Main Page Content */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side z-40">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu w-80 h-full bg-base-200 dark:bg-base-100 text-base-content dark:text-white p-4 space-y-2">
          <div className=" flex gap-2 items-center justify-around">
            <ProFastLogo /><NavToggle/>
          </div>

          {/* User Info */}
          <li className="flex items-center gap-3 px-2 py-2 border rounded-md bg-white dark:bg-neutral text-gray-800 dark:text-white shadow-sm">
        
         <div className=" rounded-full">
           <img
              src={user.photoURL}
              alt="User"
              className=" w-24 h-24 rounded-full border"
            />
         </div>
          
            <div className=" flex flex-col">
              <h1 className="font-semibold text-sm">{user.email}</h1>
              <NavLink
                to="/dashboard/update"
                className="text-sm text-blue-500 hover:underline"
              >
                <MdEdit className="inline mr-1" />
                Update Profile
              </NavLink>
            </div>
          </li>

          {/* Navigation Links */}
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${navLinkClasses} ${isActive ? activeClass : ""}`
              }
            >
              <MdHome /> Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/myparcels"
              className={({ isActive }) =>
                `${navLinkClasses} ${isActive ? activeClass : ""}`
              }
            >
              <MdLocalShipping /> My Parcels
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/history"
              className={({ isActive }) =>
                `${navLinkClasses} ${isActive ? activeClass : ""}`
              }
            >
              <MdHistory /> Payment History
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/tracker"
              className={({ isActive }) =>
                `${navLinkClasses} ${isActive ? activeClass : ""}`
              }
            >
              <MdDashboard /> Track Package
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
