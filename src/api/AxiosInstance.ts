import axios from "axios";

const API_BASE_URL: string = "https://canochat-f4a3bca4dc52.herokuapp.com/api";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
