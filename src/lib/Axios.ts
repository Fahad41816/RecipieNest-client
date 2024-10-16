/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */

"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { logout } from "../services/AuthService";

const Axiosinstance = axios.create({
  baseURL: "https://recipienest-server.vercel.app/api/v1",
});

Axiosinstance.interceptors.request.use(
  function (config) {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("Token")?.value;

    if (accessToken) {
      config.headers.Authorization = accessToken;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

Axiosinstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const config = error;

    if (error?.response?.status === 500) {
      logout();
    } else {
      return Promise.reject(error);
    }
  }
);

export default Axiosinstance;
