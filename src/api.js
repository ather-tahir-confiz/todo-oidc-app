import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://backend-todo-server.azurewebsites.net",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("accessToken");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
