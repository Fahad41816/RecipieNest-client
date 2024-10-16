/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable react-hooks/rules-of-hooks */
// eslint-disable-next-line prettier/prettier
import { useMutation, useQuery } from "@tanstack/react-query";
// eslint-disable-next-line prettier/prettier
import { GetUserData, updateUser } from "../services/AuthService";
import { toast } from "sonner";

/* eslint-disable prettier/prettier */
const useUserProfile = () => {
  const {
    data: ProfileData,
    refetch,
    isPending,
    isSuccess,
  } = useQuery({
    queryKey: ["profileData"],
    queryFn: async () => await GetUserData(),
  });

  return [ProfileData, refetch, isPending, isSuccess];
};

export const updateUserProfile = () => {
  return useMutation({
    mutationKey: ["UpdateUser"],
    mutationFn: async (userData) => await updateUser(userData),
    onSuccess: () => {
      toast.success("Profile updated successfully!");
    },
    onError: (error: any) => {
      // Since the thrown error contains the actual message, use it here
      toast.error(error.message || "Updated failed. Please try again.");
    },
  });
};

export default useUserProfile;
