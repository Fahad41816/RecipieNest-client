/* eslint-disable prettier/prettier */
/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable prettier/prettier */
/* eslint-disable padding-line-between-statements */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import { useQuery } from "@tanstack/react-query";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { GetAllAdminRecipies, GetAllRecipe, GetSingleRecipe, GetUserRecipe } from "../services/Recipie";

export const useAllRecipies = () => {
    const { data: Recipies, refetch } = useQuery({
      queryKey: ['AllRecipie'],
      queryFn: async () => {
        const Result = await GetAllAdminRecipies();
        return Result;
      }
    });
  
    return [ Recipies, refetch ]; // Return both data and refetch function
};

export const useUserRecipe = () => {

  const { data: userRecipies = [], refetch : refetchUserData } = useQuery({
    queryKey: ['userRecipie'],
    queryFn: async () => {
      const Result = await GetUserRecipe();
      return Result;
    }
  });

  return [ userRecipies, refetchUserData ]; // Return both data and refetch function

}

export const UseRecipeDetails = (id : string) => {

  const { data: Recipie = [], refetch : refetchRecipe } = useQuery({
    queryKey: ['recipeDetails', ],
    queryFn: async () => {
      const Result = await  GetSingleRecipe(id);
      return Result;
    }
  });

  return [ Recipie, refetchRecipe ]; // Return both data and refetch function

}



 