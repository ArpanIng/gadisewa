import api from "./api";

export const getCsrfToken = async () => {
  const response = await api.get("/csrf/");
  console.log("reponse data", response.data);

  return response.data;
};
