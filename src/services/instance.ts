import axios, { AxiosError } from "axios";

const baseURL =
  typeof window === "undefined"
    ? process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
    : window.location.origin;

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    "accept-encoding": "gzip",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Todo: handle authorization token if needed
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

// Add response interceptor to handle expired tokens
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    return Promise.reject(error);
  },
);

export const getErrorMessage = (error: AxiosError<{ message: string }> | Error) => {
  return (
    (error as AxiosError<{ message: string }>)?.response?.data?.message || (error as Error).message
  );
};

export default axiosInstance;
