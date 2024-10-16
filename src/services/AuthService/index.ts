/* eslint-disable prettier/prettier */
/* eslint-disable padding-line-between-statements */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
"use server";

import Axiosinstance from "@/src/lib/Axios";
import { TLogin } from "@/src/types";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const RegisterUser = async (userData: any) => {
  try {
    const { data } = await Axiosinstance.post("/Auth/Register", userData);

    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const UserLogin = async (userData: TLogin) => {
  try {
    const { data } = await Axiosinstance.post("/Auth/Login", userData);

    if (data.success) {
      cookies().set("Token", data.data.split(" ")[1]);
    }

    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const GetCurrentUser = async () => {
  const Token = cookies().get("Token")?.value;

  let decodedToken = null;

  if (Token) {
    decodedToken = await jwtDecode(Token);

    return {
      _id: decodedToken._id,
      name: decodedToken.name,
      email: decodedToken.email,
      role: decodedToken.role,
      image: decodedToken.image,
      isPremiumMember: decodedToken.isPremiumMember,
    };
  }

  return decodedToken;
};

export const GetUserData = async () => {
  const { data } = await Axiosinstance.get("/Auth/CheckUser");

  return data;
};

export const updateUser = async (userData: any) => {
  const { data } = await Axiosinstance.patch("/Auth/user", userData);

  return data;
};

export const logout = () => {
  cookies().delete("Token");
};

export const userFollowerManage = async (
  id: string,
  FolowerData: { followerid: string; followType: string }
) => {
  const { data } = await Axiosinstance.patch(
    `/Auth//Follow/${id}`,
    FolowerData
  );

  return data;
};

export const getAllUsersForAdmin = async () => {
  const { data } = await Axiosinstance.get("/Auth/AllUsers");

  return data;
};

export const ChangeUserStatus = async (id: string, status: string) => {
  const userinfo = {
    id,
    status,
  };

  const { data } = await Axiosinstance.patch("/Auth/userStatus", userinfo);

  return data;
};

export const DeleteUser = async (id: string) => {
  const { data } = await Axiosinstance.delete(`/Auth//user/${id}`);

  return data;
};

export const Changerole = async (id: string, role: string) => {
  const userinfo = {
    id,
    role,
  };

  const { data } = await Axiosinstance.patch("/Auth/userRole", userinfo);

  return data;
};

export const deleteUser = async (id: string) => {
  const { data } = await Axiosinstance.delete(`/Auth/user/${id}`);

  return data;
};

export const addusermembership = async (id: string) => {
  const { data } = await Axiosinstance.patch(`/Auth/usermembership/${id}`, {});

  return data;
};

export const SendPassWordResetLink = async (email: string) => {
  const { data } = await axios.post(
    "https://recipienest-server.vercel.app/api/v1/Auth/user/password-reset-email",
    { email: email }
  );

  return data;
};

export const ForgetPasswordChange = async (Token: string, UserData: any) => {
  const { data } = await axios.post(
    "https://recipienest-server.vercel.app/api/v1/Auth/user/passwordChange",
    UserData,
    {
      headers: {
        Authorization: Token,
      },
    }
  );

  return data;
};


export const changePasswordWithOldPass = async(email: string, passwordData: any) => {
  try {
    const data = await Axiosinstance.patch(`/Auth/changePassword/${email}`, passwordData)
  
  
    return data   
  } catch (error: any) {
   
    throw new Error(error.response.data.message);
  }
 

}