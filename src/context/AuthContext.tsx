import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { useAppDispatch } from "../store/hooks";
import { setUserData } from "../store/userSlice";

interface AuthContextType {
  user: any;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
}

const API_BASE_URL = "http://localhost:5001/ebuddy-test/us-central1/api/api";
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const dispatch = useAppDispatch();

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email,
        password,
      });
      if (response.status === 200) {
        const { token, data } = response.data;
        localStorage.setItem("token", token);
        setisAuthenticated(true);
        dispatch(setUserData(data));
        setUser(data);
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(setUserData(null));
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loading, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
