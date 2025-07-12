import React from "react";
import useUserRole from "../../../hooks/useUserRole";
import AdminDashboard from "./AdminDashboard";
import RiderDashboard from "./RiderDashboard";
import UserDashboard from "./UserDashboard";
import Forbidden from "../../forbiddenPage/Forbidden";

const DashboardHome = () => {
  const { role, isRoleLoading } = useUserRole();
  if (isRoleLoading) {
    return <p>......loading</p>;
  } else if (role === "admin") {
    return <AdminDashboard></AdminDashboard>;
  } else if (role === "rider") {
    return <RiderDashboard></RiderDashboard>;
  } else if (role === "user") {
    return <UserDashboard></UserDashboard>;
  } else {
    return <Forbidden></Forbidden>;
  }
};

export default DashboardHome;
