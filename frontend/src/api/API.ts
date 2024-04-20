import { UserInfos } from "../pages/register/Register";
import { User } from "../types_interfaces";
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
export const validAccount = async (endpoint: string, code: string) => {
  try {
    const response = await axiosInstance.post(endpoint, { code });
    return response.data;
  } catch (error) {
    console.log("Une erreur s'est produite lors de la validation du compte.");
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
export const getUserInfo = async (endpoint: string, token: string | null) => {
  try {
    const response = await axiosInstance.get<User | null>(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response && response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(
      "Une erreur s'est produite lors de la recuperation de données."
    );
    return null;
  }
};

export const getAllUsers = async (
  endpoint: string,
  token: string | null
): Promise<User[] | null | undefined> => {
  try {
    const response = await axiosInstance.get<User[] | null>(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response && response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(
      "Une erreur s'est produite lors de la recuperation de données."
    );
    return null;
  }
};

export const uploadPhoto = async (
  endpoint: string,
  token: string,
  formData: FormData
) => {
  return await axiosInstance
    .post(endpoint, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.error("error: " + error);
      throw error;
    });
};

export const refreshToken = async (endpoint: string, refresh: string) => {
  return await axiosInstance
    .post(
      endpoint,
      {},
      {
        headers: {
          Authorization: `Bearer ${refresh}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => res.data)
    .catch((error) => {
      console.error("Erreur de renouvellement du refreshToken  " + error);
      throw error;
    });
};
