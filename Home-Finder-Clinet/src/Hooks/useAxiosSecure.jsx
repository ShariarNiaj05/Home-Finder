import axios from "axios";
import { useEffect } from "react";


const axiosSecure = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: "https://home-finder-server-sepia.vercel.app",

  withCredentials: true,
});

const useAxiosSecure = () => {
  useEffect(() => {
    axiosSecure.interceptors.response.use(
        (response) => {
            console.log(response);
        return response;
      },
      (error) => {
        // return Promise.reject(error)

        if (
          error?.response?.status === 401 ||
          error?.response?.status === 403
        ) {
          console.log(error.message);
        }
      }
    );
  }, []);

  return axiosSecure;
};

export default useAxiosSecure;
