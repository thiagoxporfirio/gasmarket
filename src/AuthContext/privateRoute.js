import React from "react";

import { Navigate } from "react-router";

export function PrivateRoute({ children }) {
  const user = false;

  return user ? children : <Navigate to="/" />;
};
