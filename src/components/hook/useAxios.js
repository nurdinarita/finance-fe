import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const baseURL = process.env.REACT_APP_API_URL;

const useAxios = () => {
  const { auth } = useContext(AuthContext);

  const newRequest = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${auth?.token}`,
      "content-type": "application/json",
    },
    // withCredentials: true,
  });

  newRequest.interceptors.request.use(
    async (req) => {
      return req;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  // newRequest.interceptors.response.use(
  //   async (res) => {
  //     return res;
  //   },
  //   (error) => {
  //     if (error.response) {
  //       if (error.response.status === 419 || error.response.status === 401) {
  //         localStorage.removeItem('auth');
  //         window.location.href = '/auth/login';
  //       }
  //     }
  //     Promise.reject(error);
  //   },
  // );

  return newRequest;
};

export default useAxios;
