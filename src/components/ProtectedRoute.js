import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, isAuthChecked } = useSelector((state) => state.user);
  if (!isAuthChecked) {
    console.log("isAuthChecked No!");
    return;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
