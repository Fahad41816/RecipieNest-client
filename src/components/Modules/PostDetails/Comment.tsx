/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable prettier/prettier */
"use client";

import { useUser } from "@/src/context/AuthProvider";
import { AddRecipeComment} from "@/src/services/comment"; 
import React, { useState } from "react";
import { toast } from "sonner";

const CommentSection = ({ recipe, refetchRecipe }: any) => {
  const [comment, setcomment] = useState(" ");


  const { user } : any = useUser();

  //    const date = new Date()

  const handleUserComment = async () => {
    

    const commentData = {
      user: user._id,
      comment: comment,
      recipie: recipe,
    };

    const Responce = await AddRecipeComment(commentData);

    if (Responce.success) {
      toast.success("Comment Added");
      setcomment(" ")
      refetchRecipe()
    }
  };

 

  return (
    <div className="flex items-center space-x-4 mt-6">
      <img
        src={user?.image}
        alt="User Avatar"
        className="w-10 h-10 rounded-full"
      />
      <input
        type="text"
        placeholder="Write a comment..."
        value={comment}
        onChange={(e) => setcomment(e.target.value)}
        className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleUserComment}
        className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-7"
        >
          <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
        </svg>
      </button>
    </div>
  );
};

export default CommentSection;
