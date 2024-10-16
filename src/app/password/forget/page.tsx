/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable prettier/prettier */
'use client'

import { SendPassWordResetLink } from '@/src/services/AuthService';
import React, { useState } from 'react';

const Page = () => {
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSuccess(false);
    setIsError(false);

    try {
      const response = await SendPassWordResetLink(email);

      if (response.success) {
        setIsSuccess(true);
      } else {
        setIsError(true);
        setErrorMessage(response.message || "Something went wrong. Please try again.");
      }
    } catch (error : any) { 
      setIsError(true);
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center  ">
        <div className="p-6 rounded-lg shadow-lg max-w-md w-full   ">
          <h2 className="text-2xl font-bold text-center mb-4  ">
            Forgot Your Password?
          </h2>
          <p className="text-center   mb-6">
            Enter your email address and we&rsquo;ll send you a link to reset your password.
          </p>
          
          {/* Success Message */}
          {isSuccess && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
              <strong className="font-bold">Success!</strong>
              <span className="block sm:inline"> Password reset link has been sent to your email.</span>
            </div>
          )}
          
          {/* Error Message */}
          {isError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline"> {errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block   text-sm font-bold mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200 border-gray-300"
                placeholder="you@example.com"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600   font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300"
            >
              Send Reset Link
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;
