/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable prettier/prettier */
"use client";

import { useUser } from "@/src/context/AuthProvider";
import { changePasswordWithOldPass } from "@/src/services/AuthService";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { toast } from "sonner";

const SettingsPage = () => { 
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const {user} : any = useUser()

  const handlePasswordChange = async(e: any) => {
    e.preventDefault();

    try {
      const passwordData =  {
        oldPassword : currentPassword,
        newPassword : newPassword
      }
      
      const Responce: any = await changePasswordWithOldPass(user.email, passwordData)
      // eslint-disable-next-line  no-console
      console.log(Responce)
      if(Responce.success){
        toast.success('Password Change successfully!')
        setCurrentPassword("")
        setNewPassword("")
      } 
    } catch (error : any) {
      
      // eslint-disable-next-line no-console
      console.log(error)

      toast.error(error.message)
    }

  };
 

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        {" "}
        <p className="flex items-center justify-center gap-2">
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-8"
          >
            <path
              fillRule="evenodd"
              d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              clipRule="evenodd"
            />
          </svg>
          Account Settings
        </p>
      </h2>

      {/* User Info */}
      <div className="mb-6">
        <label className="block font-semibold text-default-gray-700">
          Email
        </label>
        <input
          type="email"
          value={user?.email} // Static email for example
          className="w-full mt-2 p-2 border border-gray-300 rounded-lg bg-default-gray-100 cursor-not-allowed"
          readOnly
        />
      </div>

      {/* Show Password Fields */}
      <form onSubmit={handlePasswordChange}>
        <div className="mb-4">
          <label className="block font-semibold text-default-gray-700">
            Current Password
          </label>
          <input
            type="password"
            placeholder="Enter current password"
            className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold text-default-gray-700">
            New Password
          </label>
          <input
            type="password"
            placeholder="Enter new password"
            className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <Button
          color="primary"
          variant="shadow"
          type="submit"
          className="w-full text-default-white py-2 rounded-lg"
        >
          Save New Password
        </Button>
      </form>

      {/* Delete Account */}
     
    </div>
  );
};

export default SettingsPage;
