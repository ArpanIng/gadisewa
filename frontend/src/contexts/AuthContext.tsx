import {
  createContext,
  useState,
  type PropsWithChildren,
  useContext,
  useEffect,
} from "react";
import { jwtDecode } from "jwt-decode";

import { type UserProfile } from "../schemas/users.schema";
import api from "../services/api";
import { getProfile } from "../services/users.services";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../utils/constants";

type AuthContext = {
  user?: UserProfile | null;
  refreshToken: () => Promise<void>;
  fetchUserProfile: () => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
};
type AuthProviderProps = PropsWithChildren;
const AuthContext = createContext<AuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem(ACCESS_TOKEN);
      if (!token) {
        setLoading(false);
        return;
      }

      const decoded: any = jwtDecode(token);
      const now = Date.now() / 1000;

      if (decoded.exp < now) {
        await refreshToken();
      } else {
        await fetchUserProfile();
      }

      setLoading(false);
    };

    initAuth();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const user = await getProfile();
      setUser(user);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      setUser(null);
    }
  };

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    if (!refreshToken) {
      setUser(null);
      return;
    }

    try {
      const res = await api.post("/api/auth/token/refresh/", {
        refresh: refreshToken,
      });
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        await fetchUserProfile();
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      setUser(null);
    }
  };

  const logout = async () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, fetchUserProfile, refreshToken, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used inside of a AuthProvider.");
  }
  return context;
};
