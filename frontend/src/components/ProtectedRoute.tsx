// import { Navigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";

// import { ACCESS_TOKEN, REFRESH_TOKEN } from "../utils/constants";
// import { useEffect, useState } from "react";
// import api from "../services/api";

// const ProtectedRoute = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(null);

//   useEffect(() => {
//     auth().catch(() => setIsAuthenticated(false));
//   }, []);

//   const refreshToken = async () => {
//     const refreshToken = localStorage.getItem(REFRESH_TOKEN);
//     try {
//       const res = await api.post("/api/auth/token/refresh/", {
//         refresh: refreshToken,
//       });
//       if (res.status === 200) {
//         localStorage.setItem(ACCESS_TOKEN, res.data.access);
//         setIsAuthenticated(true);
//       } else {
//         setIsAuthenticated(false);
//       }
//     } catch (error) {
//       setIsAuthenticated(false);
//       console.error("Error refreshing token:", error);
//     }
//   };

//   const auth = async () => {
//     const token = localStorage.getItem(ACCESS_TOKEN);
//     if (!token) {
//       setIsAuthenticated(false);
//       return;
//     }
//     const decoded = jwtDecode(token);
//     const tokenExpiration = decoded.exp;
//     const now = Date.now() / 1000; // in seconds
//     if (tokenExpiration < now) {
//       await refreshToken();
//     } else {
//       setIsAuthenticated(true);
//     }
//   };

//   if (isAuthenticated === null) {
//     return <div>loading...</div>;
//   }

//   return isAuthenticated ? children : <Navigate to="/login" replace />;
// };

// export default ProtectedRoute;

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
