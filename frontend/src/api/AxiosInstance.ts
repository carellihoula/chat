import axios from "axios";

const API_BASE_URL: string =
  "https://c7gljno857ucsl.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com/api";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
