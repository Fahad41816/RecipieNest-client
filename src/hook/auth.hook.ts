/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */

import {  useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { getAllUsersForAdmin, RegisterUser, UserLogin } from "../services/AuthService";
import { TLogin } from "../types";

export const useLoginUser = () => {
    return useMutation({
      mutationKey: ["userLogin"],
      mutationFn: async (userData: TLogin) => await UserLogin(userData),
      onSuccess: () => {
        toast.success("User Login Successfully!");
      },
      onError: (error: any) => { 
        // Since the thrown error contains the actual message, use it here
        toast.error("Invalid Password or Email!");
      },
    });
  };

export const useRegisterUser = () => {

  return useMutation({
    mutationKey: ['registration'],
    mutationFn: async(UserData) => await RegisterUser(UserData),
    onSuccess: () => {
      toast.success("User Register Successfully!");
    },
    onError: (error: any) => { 
      // Since the thrown error contains the actual message, use it here
      toast.error(error.message || "Register failed. Please try again.");
    },
  })

}  

export const useGetAllUser = () => {

    const {data: users, refetch: usersRefetch} = useQuery({
      queryKey: ['AllUser'],
      queryFn: async() => await getAllUsersForAdmin()
    })

    return [users, usersRefetch]

} 
  
