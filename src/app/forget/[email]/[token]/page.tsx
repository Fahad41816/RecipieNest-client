// eslint-disable-next-line prettier/prettier
// eslint-disable-next-line prettier/prettier
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable prettier/prettier */ 
'use client'

import { ForgetPasswordChange } from "@/src/services/AuthService";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
 
export default function ChangePassword({params}: any) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const Router = useRouter()

  const handleSubmit = async(e : any) => {
    e.preventDefault();
    // Handle password change logic here (API call)
    if (password !== confirmPassword) {
      toast.success("Passwords do not match");
      return;
    }
    
    const userData = {
      id: params.email,
      password: password
    }

    try {
      const response = await ForgetPasswordChange(params.token, userData) 
      if(response.success){
        setPassword(" ")
        setConfirmPassword(" ")
        toast.success('Password Change Successfully!')
        Router.push('/login')
      }
    } catch (error : any) {
      toast.error('Something Wrong!')
    }
    

 

  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className=" p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-4 ">
          Change Your Password
        </h2>
        <p className="text-center  mb-6">
          Enter your new password below.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block  text-sm font-bold mb-2"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200 border-gray-300"
              placeholder="Enter new password"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block   text-sm font-bold mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200 border-gray-300"
              placeholder="Confirm your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}
