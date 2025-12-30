import api from "./api";
import { type Login } from "../schemas/auth.schema";

export const login = async (data: Login) => {
  const response = await api.post("/api/auth/login/", data);
  return response.data;
};

export const logout = async () => {
  await api.post("/api/auth/logout/");
};

export const refreshToken = async () => {
  await api.post("/api/auth/token/refresh/");
};
