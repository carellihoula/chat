import { UserInfos } from "../pages/register/Register";
import { axiosInstance } from "./AxiosInstance";

export const postData = async (endpoint: string, data: UserInfos) => {
  try {
    const response = await axiosInstance.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.log("Une erreur s'est produite lors de l'inscription.");
    throw error;
  }
};

export const loginUser = async (endpoint: string, data: Partial<UserInfos>) => {
  try {
    const response = await axiosInstance.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.log("Une erreur s'est produite lors de la connexion.");
    throw error;
  }
};

export const getData = async (endpoint: string) => {
  try {
    const response = await axiosInstance.get(endpoint);
    return response.data;
  } catch (error) {
    console.log(
      "Une erreur s'est produite lors de la recuperation de données."
    );
  }
};

export const refreshToken = async () => {
  const refresh = localStorage.getItem("refreshToken");
  try {
    const response = await axiosInstance.post(`/refresh-token`, {
      refresh: refresh,
    });
    localStorage.setItem("token", JSON.stringify(response.data.token));
    return response.data.bearer;
  } catch (error) {
    console.log("Une erreur s'est produite lors de la generation du token.");
    throw error;
  }
};
