import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, type Login } from "../../schemas/auth.schema";
import { login } from "../../services/auth.service";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../utils/constants";
import { useAuth } from "../../contexts/AuthContext";

export default function Login() {
  const { fetchUserProfile } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState<"garage" | "vendor">("garage");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Login>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await login(data);
      localStorage.setItem(ACCESS_TOKEN, response.access);
      localStorage.setItem(REFRESH_TOKEN, response.refresh);
      await fetchUserProfile();
      navigate("/", { replace: true });
    } catch (error: any) {
      if (error.response?.data) {
        const errors = error.response.data;
        if (errors.non_field_errors) {
          setServerError(errors.non_field_errors.join(""));
        } else if (errors.detail) {
          setServerError(errors.detail);
        }
      }
      console.error("Error handling login:", error);
    }
  });

  return (
    <div className="min-h-screen flex w-full bg-slate-50 dark:bg-[#101a22]">
      {/* Left Side - Image */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 relative items-center justify-center overflow-hidden">
        <div
          className={`absolute inset-0 bg-cover bg-center opacity-40 transition-all duration-700 ${
            role === "garage"
              ? "bg-[url('https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=1974')]"
              : "bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2070')]"
          }`}
        ></div>
        <div className="relative z-10 p-12 text-white text-center">
          <div
            className={`w-20 h-20 rounded-xl mx-auto mb-6 flex items-center justify-center text-4xl font-bold shadow-lg transition-colors duration-300 ${
              role === "garage" ? "bg-blue-600" : "bg-purple-600"
            }`}
          >
            G
          </div>
          <h1 className="text-5xl font-bold mb-4">
            GadiSewa {window.location.hostname}
          </h1>
          <p className="text-xl text-slate-300 max-w-md mx-auto">
            {role === "garage"
              ? "Complete Garage Management System."
              : "Vendor Portal for Automotive Parts."}
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Welcome Back
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Please enter your details to login.
            </p>
          </div>

          {serverError && (
            <div className="mb-4 text-red-600 font-medium">{serverError}</div>
          )}

          <form className="space-y-6" onSubmit={onSubmit}>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="Enter your email"
              />
              {errors.email && (
                <span className="text-red-600 mt-2">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Password
              </label>
              <input
                {...register("password")}
                type="password"
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="••••••••"
              />
              {errors.password && (
                <span className="text-red-600">{errors.password.message}</span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="text-blue-600 focus:ring-blue-500 w-4 h-4 rounded border-gray-300 focus:ring-2"
                />
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  Remember me
                </span>
              </label>
              <a
                href="#"
                className="text-sm text-blue-600 font-medium hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              {isSubmitting ? "Loading..." : "Login"}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-300 dark:border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-50 dark:bg-[#101a22] text-slate-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-2.5 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                className="w-5 h-5"
                alt="Google"
              />
              <span className="text-sm font-medium">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 py-2.5 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <img
                src="https://www.svgrepo.com/show/475647/facebook-color.svg"
                className="w-5 h-5"
                alt="Facebook"
              />
              <span className="text-sm font-medium">Facebook</span>
            </button>
          </div>

          <p className="text-center text-sm text-slate-600 dark:text-slate-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-bold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
