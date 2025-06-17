import axios, { AxiosInstance } from "axios";

const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL + "/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("accessToken") ? `Bearer ${localStorage.getItem("accessToken")}` : null,
  },
});

export default http;