/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
"use server";

import Axiosinstance from "@/src/lib/Axios";
import { GetCurrentUser } from "../AuthService";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const GetAllRecipe = async (page: number, searchTerm: string,  FilterRating : string, FilterTimeing: string) => {
  
  const user = await GetCurrentUser()

  
  const { data } = await Axiosinstance.get(`Recipie?page=${page ? page : 1}&searchTerm=${searchTerm ? searchTerm : ""}&Rating=${FilterRating? FilterRating: ''}&timeDuration=${FilterTimeing? FilterTimeing: ''}&isPremiumMember=${user?.isPremiumMember}`);

  return data;
};
export const GetAllAdminRecipies = async () => {
  
  const { data } = await Axiosinstance.get(`Recipie/AllRecipieForAdmin`);

  return data;
};



export const GetSingleRecipe = async (id: string) => {
  const { data } = await Axiosinstance.get(`Recipie/${id}`);

  return data;
};

export const GetUserRecipe = async () => {
  const user : any = await GetCurrentUser();

  const { data } = await Axiosinstance.get(`Recipie/user/${user._id}`);

  return data;
};

export const AddUserRecipe = async (RecipeData: any) => {
  const { data } = await Axiosinstance.post(`Recipie`, RecipeData);

  return data;
};

export const DeleteRecipie = async (Recipeid: string) => {
  const { data } = await Axiosinstance.delete(`Recipie/${Recipeid}`);

  return data;
};

export const UpdateRecipeData = async (id: string, updateData: any) => {
  const { data } = await Axiosinstance.patch(`Recipie/${id}`, updateData);

  return data;
};

export const updaterecipeVote = async (id: string, vote: any) => {
  const { data } = await Axiosinstance.patch(`Recipie/Like/${id}`, vote);

  return data;
};

export const addrecipieRatting = async(id : string, Rating : {user: string, rating: number | string}) => {
    
  const { data } = await Axiosinstance.patch(`/Recipie/Rating/${id}`, Rating);

  return data;
};

export const changeRecipieStatus = async(id : string, status: string) => {

  const recipeInfo = {
      status
  }
  

  const { data } = await Axiosinstance.patch(`/Recipie/Status/${id}`, recipeInfo);

  return data;

}
export const changeRecipiePrimiumStatus = async(id : string, status: boolean) => {

  const recipeInfo = {
    status
  }

  const { data } = await Axiosinstance.patch(`/Recipie/PrimiumStatus/${id}`, recipeInfo);

  return data;

}


