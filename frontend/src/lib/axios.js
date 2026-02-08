import axios from "axios";


const baseURL = process.meta.env.MODE === "development" ? "http://localhost:4000/api" : "api";
const axiosInstance = axios.create({
  baseURL: baseURL,
});

export default axiosInstance;