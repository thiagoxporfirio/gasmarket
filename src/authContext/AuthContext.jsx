import { createContext } from "react";

export const AuthContext = createContext();

export const AuthContextValue = {
  user: null,
  signin: (username, password) => Promise.resolve(false),
  signout: () => {},
};
