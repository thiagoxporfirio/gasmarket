import { useContext } from "react";

import Dinied  from "../pages/Dinied";

export const RequireAuth = ({ children }) => {
  const auth = useContext();

  if (!auth.user) {
    return <Dinied />;
  }

  return children;
};
