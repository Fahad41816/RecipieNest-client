/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable prettier/prettier */
import Link from 'next/link'; 
import React from 'react'

const page = () => {

 

    // Handle redirect to posts or premium content
  
  
    return (
      <div className="min-h-screen flex flex-col justify-center items-center ">
        <div className=" shadow-lg rounded-lg p-8 max-w-md text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-green-500 mx-auto mb-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
  
          <h2 className="text-3xl font-bold  mb-4">
            Congratulations!
          </h2>
  
          <p className="text-lg  mb-4">
            You are now our premium member! 🎉
          </p>
  
          <p className="text-md  mb-8">
            As a premium member, you can now view all posts, including exclusive premium content.
          </p>
  
         
        </div>
  
        <div className="mt-8">
            <Link href={'/'}><button
            
            className="text-blue-500 hover:underline"
          >
            Go to Home
          </button></Link>
          
        </div>
      </div>
    );
}

export default page