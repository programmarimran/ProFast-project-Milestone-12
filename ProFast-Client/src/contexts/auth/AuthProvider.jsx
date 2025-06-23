import React from "react";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
  return (
    <div>
      <AuthContext value={{ imran: "imran" }}>{children}</AuthContext>
    </div>
  );
};

export default AuthProvider;
