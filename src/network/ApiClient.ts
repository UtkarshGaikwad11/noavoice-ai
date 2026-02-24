// import axios, { AxiosError } from "axios";

// const axiosClient = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL,
//   timeout: 60000,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });


// axiosClient.interceptors.request.use(
//   (config) => {
//     if (typeof window !== "undefined") {
//       const token = localStorage.getItem("access_token");

//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );


// axiosClient.interceptors.response.use(
//   (response:any) => response.data,
//   (error: AxiosError<any>) => {
//     const message =
//       error.response?.data?.message ||
//       error.message ||
//       "Something went wrong";

//     return Promise.reject({
//       status: error.response?.status,
//       message,
//       data: error.response?.data,
//     });
//   }
// );

// export default axiosClient;


import axios, { AxiosError } from "axios";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");

      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError<any>) => {
    const status = error.response?.status;
    const message =
      error.response?.data?.message ||
      error.response?.data?.detail ||
      error.message ||
      "Something went wrong";

    return Promise.reject({
      status,
      message,
      data: error.response?.data,
    });
  }
);

export default axiosClient;