/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable prettier/prettier */
"use client";

import {
  HandThumbUpIcon,
  HandThumbDownIcon,
  ChatBubbleLeftEllipsisIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import PostCard from "./PostCardDecriptin";
import { DeleteRecipie } from "@/src/services/Recipie";
import { toast } from "sonner";
import { useUserRecipe } from "@/src/hook/Recipie.hook";
import { Chip } from "@nextui-org/chip";

const RecipePostCard = ({ recipe, EditPermission, handleOpen }: any) => {
  const [, refetchUserData] = useUserRecipe();

  const HandleDeleteRecipe = async (id: string) => {
    const Responce = await DeleteRecipie(id);

    if (Responce.success) {
      toast.success("Recipe Product Deleted");
      refetchUserData();
    }
  };

  return (
    <div className="relative bg-default-white rounded-lg shadow-lg border overflow-hidden w-full max-w-sm min-w-[200px] mx-auto cursor-pointer">
      {EditPermission && (
        <div className="absolute p-2 flex flex-col gap-1 top-4 right-4 z-10 bg-slate-600 bg-opacity-50">
          <svg
            onClick={() => HandleDeleteRecipe(recipe._id)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6 text-red-500"
          >
            <path
              fillRule="evenodd"
              d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
              clipRule="evenodd"
            />
          </svg>
          <div className="flex flex-wrap gap-3">
            <svg
              onClick={() => handleOpen(recipe)}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6 text-blue-500"
            >
              <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
              <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
            </svg>
          </div>
        </div>
      )}

      {/* Recipe Image */}
      <Link href={`/${recipe._id}`}>
        <div className="relative">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-48 object-cover"
          />
        </div>

        {/* Card Content */}
        <div className="p-4">
          {/* Title */}
          <h3 className="text-xl font-semibold text-default-gray-800">
            {recipe.title}
          </h3>

          <PostCard text={recipe.description} />

          {/* recipe.description.slice(0, 100) +
          (recipe.description.length > 100 ? "..." : "") */}

          <div className="flex items-center justify-between space-x-1 mt-2">
            <div className="flex items-center space-x-1 mt-2">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5 text-amber-500"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{recipe.avgRating}</span>
            </div>
            <span>{recipe.isPremiumContent &&  <Chip color="warning">Premium</Chip>}</span>
          </div>
          {/* Upvote, Downvote, and Comments */}
          <div className="mt-4 flex justify-between items-center text-gray-600">
            {/* Upvote/Downvote Section */}
            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-1 text-green-500 hover:text-green-600">
                <HandThumbUpIcon className="h-5 w-5" />
                <span>{recipe.upvotes?.length}</span>
              </button>
              <button className="flex items-center space-x-1 text-red-500 hover:text-red-600">
                <HandThumbDownIcon className="h-5 w-5" />
                <span>{recipe.downvotes?.length}</span>
              </button>
            </div>

            {/* Comment Count */}
            <div className="flex items-center space-x-1">
              <ChatBubbleLeftEllipsisIcon className="h-5 w-5 text-blue-500" />
              <span>{recipe.comments?.length}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RecipePostCard;
