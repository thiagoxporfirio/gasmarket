import { useEffect, useState } from "react";
import { useApi } from "../hooks/useApi";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const api = useApi();

  useEffect(() => {
    async () => {
      const storageData = localStorage.getItem('AuthToken');
      if (storageData) {
        const data = await api.validateToken(storageData);
        if (data.user) {
          setUser(data.user);
        }
      }
    };
  }, [api]);

  const signin = async (username, password) => {
    const data = await api.signin(username, password);
    if (data.user && data.token) {
      setUser(data.user);
      setToken(data.token);
      return true;
    }
    return false;
  };

  const signout = async () => {
    setUser(null);
    setToken('');
    await api.logout();
  };

  const setToken = (token) => {
    localStorage.setItem('AuthToken', token);
  };

  return (
    <Provider value={{ user, signin, signout }}>
      {children}
    </Provider>
  );
};
