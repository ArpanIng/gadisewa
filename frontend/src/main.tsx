import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

import "./index.css";
import App from "./App.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import Login from "./pages/auth/Login.tsx";
import Registration from "./pages/auth/Registration.tsx";
import { MainLayout } from "./layouts/MainLayout.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import Customers from "./pages/garages/Customers.tsx";
import { NotFound } from "./pages/NotFound.tsx";
import { Forbidden } from "./pages/Forbidden.tsx";
import CustomerProfile from "./pages/garages/CustomerProfile.tsx";
import Inventory from "./pages/Inventory.tsx";
import Appointments from "./pages/garages/Appointments.tsx";
import UserManagement from "./pages/admin/UserManagement.tsx";
import JobBoard from "./pages/JobBoard.tsx";
import CreateJob from "./pages/CreateJob.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <App />
                </ProtectedRoute>
              }
            />
            <Route
              path="jobs"
              element={
                <ProtectedRoute>
                  <JobBoard />
                </ProtectedRoute>
              }
            />
            <Route
              path="jobs/new"
              element={
                <ProtectedRoute>
                  <CreateJob />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin/users"
              element={
                <ProtectedRoute>
                  <UserManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="appointments"
              element={
                <ProtectedRoute>
                  <Appointments />
                </ProtectedRoute>
              }
            />
            <Route
              path="customers"
              element={
                <ProtectedRoute>
                  <Customers />
                </ProtectedRoute>
              }
            />
            <Route
              path="customers/:customerId"
              element={
                <ProtectedRoute>
                  <CustomerProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="inventory"
              element={
                <ProtectedRoute>
                  <Inventory />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Registration />} />
          <Route path="forbidden" element={<Forbidden />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
