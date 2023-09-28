import React from "react";

import { Navigate } from "react-router";

export function PrivateRoute({ children }) {
  const user = localStorage.getItem("userLoggedInOk") === "true";

  return user ? children : <Navigate to="/" />;
};
