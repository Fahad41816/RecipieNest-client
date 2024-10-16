/* eslint-disable prettier/prettier */
"use server";

import Axiosinstance from "@/src/lib/Axios";

/* eslint-disable prettier/prettier */
export const AddRecipeComment = async(commentData : any) => {

    const { data } = await Axiosinstance.post(`/Comment`, commentData);
  
    return data;
  
}
export const updateUserComment = async(id: string, commentData : any) => {

    const { data } = await Axiosinstance.patch(`/Comment/${id}`, {comment: commentData});
  
    return data;
  
}
export const DeleteUserComment = async(id : string) => {

    const { data } = await Axiosinstance.delete(`/Comment/${id}`);
  
    return data;
  
}