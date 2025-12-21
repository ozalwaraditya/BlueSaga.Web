import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { auth_api } from "../utility/url";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const isAuthenticated = currentUser != null;

  const setAppUser = (user) => {
    setCurrentUser({
      ...user,
    });
    localStorage.setItem("currentUser", JSON.stringify(user));
  };

  const logout = () => {
    toast.promise(
      axios.post(auth_api + "/api/auth/logout", {}, { withCredentials: true }),
      {
        loading: "Logging out...",
        success: () => {
          localStorage.removeItem("currentUser");
          setCurrentUser(null);
          navigate("/");
          return "Logged out successfully!";
        },
        error: (error) =>
          error.response?.data?.message || error.message || "Logout failed",
      }
    );
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ currentUser, setAppUser, isAuthenticated, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
