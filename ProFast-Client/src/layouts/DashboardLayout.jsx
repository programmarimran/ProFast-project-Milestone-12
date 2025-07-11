import {
  MdHome,
  MdHistory,
  MdLocalShipping,
  MdEdit,
  MdDashboard,
  MdDoneAll,
  MdAttachMoney,
} from "react-icons/md";
import { NavLink, Outlet } from "react-router";
import ProFastLogo from "../shared/proFastLogo/ProFastLogo";
import useAuth from "../hooks/useAuth";
import NavToggle from "../components/theme/NavToggle";
import { FaUserClock, FaUsers } from "react-icons/fa";
import { FaPersonBiking } from "react-icons/fa6";
import useUserRole from "../hooks/useUserRole";

const DashboardLayout = () => {
  const { user } = useAuth();
  const { role } = useUserRole();
  console.log(user);
  const navLinkClasses =
    "flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all duration-200 hover:bg-purple-200 dark:hover:bg-purple-800";

  const activeClass = "bg-purple-300 dark:bg-purple-700";

  return (
    <div className="drawer h-screen  lg:drawer-open bg-gradient-to-bl from-[#8742bc10] to-[#36174b10] dark:from-[#8742bc20] dark:to-[#36174b30]">
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
      <div className="drawer-side  bg-base-200 dark:bg-base-100  h-screen  z-40">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <div className=" flex h-[200px] gap-2 items-center justify-around">
          <ProFastLogo />
          <NavToggle />
        </div>
        <ul className="menu  max-h-screen w-80  overflow-x-hidden overflow-y-auto  text-base-content dark:text-white p-4 space-y-2">
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

          {role && role === "admin" && (
            <>
              <li>
                <NavLink
                  to="/dashboard/assign-parcels"
                  className={({ isActive }) =>
                    `${navLinkClasses} ${isActive ? activeClass : ""}`
                  }
                >
                  <FaUsers /> Assign Parcels
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/active-riders"
                  className={({ isActive }) =>
                    `${navLinkClasses} ${isActive ? activeClass : ""}`
                  }
                >
                  <FaUsers /> Active Riders
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/pending-riders"
                  className={({ isActive }) =>
                    `${navLinkClasses} ${isActive ? activeClass : ""}`
                  }
                >
                  <FaUserClock /> Pending Riders
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/make-admin"
                  className={({ isActive }) =>
                    `${navLinkClasses} ${isActive ? activeClass : ""}`
                  }
                >
                  MakeAdmin
                </NavLink>
              </li>
            </>
          )}

          {role && role === "rider" && (
            <>
              <li>
                <NavLink
                  to="/dashboard/pending-deliveries"
                  className={({ isActive }) =>
                    `${navLinkClasses} ${isActive ? activeClass : ""}`
                  }
                >
                  PendingDeliveries
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/completed-deliveries"
                  className={({ isActive }) =>
                    isActive ? "text-green-600 font-semibold" : "text-gray-600"
                  }
                >
                  <MdDoneAll className="inline-block mr-1" />
                  Completed Deliveries
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/my-earnings"
                  className={({ isActive }) =>
                    `${navLinkClasses} ${isActive ? activeClass : ""}`
                  }
                >
                  <MdAttachMoney
                    className="inline-block mr-2 text-green-500"
                    size={18}
                  />
                  My Earnings
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
