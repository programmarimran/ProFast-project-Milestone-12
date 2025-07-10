import React from "react";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";
import { Navigate } from "react-router";

const RiderRoute = ({ children }) => {
  const { user, loading } = useAuth();
  // console.log(user)
  const { role, isRoleLoading } = useUserRole();
  if (loading||isRoleLoading) {
    return <span className="loading loading-spinner loading-xl"></span>;
  }
  if(!user|| role !=="rider"){
    return <Navigate to={'/forbidden'}></Navigate>
  }
  return children;
};

export default RiderRoute;
