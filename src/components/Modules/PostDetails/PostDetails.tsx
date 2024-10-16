/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-key */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */

"use client";

import React, { useState } from "react";
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
  ChatBubbleLeftEllipsisIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import { Image } from "@nextui-org/image";
import DecriptionText from "@/src/components/ui/DecriptionText";
import { Avatar } from "@nextui-org/avatar";
import { Chip } from "@nextui-org/chip";
import CommentSection from "@/src/components/Modules/PostDetails/Comment";
import { getRelativeTime } from "@/src/utils/GetAgeTime";
import { UseRecipeDetails } from "@/src/hook/Recipie.hook";
import { monthNames } from "@/src/utils/constant";
import { DeleteUserComment, updateUserComment } from "@/src/services/comment";
import { toast } from "sonner";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useUser } from "@/src/context/AuthProvider";
import { addrecipieRatting, updaterecipeVote } from "@/src/services/Recipie";
import {
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from "@nextui-org/modal";
import { userFollowerManage } from "@/src/services/AuthService";

const PostDetailsSection = ({ RecipeId }: any) => {
  const [data, refetchRecipe] = UseRecipeDetails(RecipeId);

  const [isSelectEdit, setisSelectEdit] = useState(false);
  const [editedcmntid, seteditedcmntid]: any = useState();
  const [selectEditComment, setselectEditComment] = useState("");

  const { user }: any = useUser();

  const handleditComment = (id: string, cmnt: string) => {
    setisSelectEdit(true);
    seteditedcmntid(id);
    setselectEditComment(cmnt);
  };

  const handleupdateComment = async () => {
    const Responce = await updateUserComment(editedcmntid, selectEditComment);

    if (Responce.success) {
      toast.success("Comment Updated");
      refetchRecipe();
      setisSelectEdit(false);
      seteditedcmntid("");
      setselectEditComment("");
    }
  };

  const handleDeleteComment = async (id: string) => {
    const Responce = await DeleteUserComment(id);

    if (Responce.success) {
      toast.success("Comment Deleted");
      refetchRecipe();
    }
  };

  const handleRecipeVote = async (vote: string) => {
    const voteData = {
      user: user._id,
      vote: vote,
    };

    const responce = await updaterecipeVote(data.data._id, voteData);

    if (responce.success) {
      toast.success("Recipe Voted!");
      refetchRecipe();
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userRating, setUserRating] = useState(0); // User-selected

  const handleOpen = () => {
    onOpen();
  };

  // Function to handle star click
  const handleStarClick = (rating: any) => {
    setUserRating(rating);
  };

  // Function to handle rating submission
  const handleRatingSubmit = async () => {
    const rattingData = {
      user: user._id,
      rating: userRating,
    };

    const responce = await addrecipieRatting(data.data._id, rattingData);

    if (responce.success) {
      toast.success("Your Ratting Added!");
      refetchRecipe();
    }

    onClose(); // Close modal after submission
  };

  const findUserRating = data?.data?.ratings?.find(
    (rating: any) => rating?.user == user?._id
  );

  const IsUserUpVote = data?.data?.upvotes?.find(
    (vote: any) => vote == user?._id
  );

  const IsCurrentUserFollowRecipeCreater = data?.data?.user?.followers?.find(
    (followerid: string) => followerid == user?._id
  );

  const handlefollowUnfollow = async (Actiontype: string) => {
    const FollowerData = {
      followerid: user._id,
      followType: Actiontype,
    };

    const responce = await userFollowerManage(data.data.user._id, FollowerData);

    if (responce.success) {
      toast.success(` ${Actiontype} this user`);
      refetchRecipe();
    }
  };

  return (
    <>
      <div className="mb-5">
        <h1 className="text-4xl font-bold text-default-gray-800 ">
          {data?.data?.title}
        </h1>
        <p className="text-slate-400 mt-2">
          {data?.data && getRelativeTime(data?.data?.createdAt)}
        </p>
      </div>

      {/* Recipe Image */}
      <div className="w-full  mb-6">
        <Image
          width={1200}
          height={400}
          isZoomed
          src={data?.data?.image}
          alt={data?.data?.title}
        />
      </div>

      {/* Recipe Description */}
      <DecriptionText text={data?.data?.description} />

      {/* Rating Section */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center mb-2">
          <StarIcon className="h-6 w-6 text-yellow-500" />
          <StarIcon className="h-6 w-6 text-yellow-500" />
          <StarIcon className="h-6 w-6 text-yellow-500" />
          <StarIcon className="h-6 w-6 text-yellow-500" />
          <StarIcon className="h-6 w-6 text-gray-300" />
          <span className="ml-2 text-default-gray-600">
            ({data?.data?.avgRating} out of 5 stars)
          </span>
        </div>
        <div className="mb-4">
          {findUserRating ? (
            <div className="flex items-center justify-start gap-1">
              <h1>Your Rating</h1>
              {Array.from({ length: findUserRating.rating }).map((_, index) => (
                <StarIcon key={index} className="h-6 w-6 text-yellow-500" />
              ))}
            </div>
          ) : (
            // Render stars based on the rating

            // Button to open the rating modal if no rating exists
            <Button
              onClick={() => handleOpen()} // Changed onPress to onClick
              radius="full"
              className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
            >
              Give Your Rating{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6 ml-2"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          )}
        </div>
      </div>

      {/* Upvote/Downvote Section */}
      <div className="flex items-center mb-6">
        <button
          disabled={IsUserUpVote && true}
          onClick={() => handleRecipeVote("upVote")}
          className="flex items-center space-x-2 text-green-500 hover:text-green-600"
        >
          {IsUserUpVote ? (
            <HandThumbUpIcon className="h-6 w-6" />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
              />
            </svg>
          )}

          <span>Upvote ({data?.data?.upvotes?.length})</span>
        </button>
        <button
          disabled={!IsUserUpVote && true}
          onClick={() => handleRecipeVote("downVote")}
          className="flex items-center space-x-2 ml-4 text-red-500 hover:text-red-600"
        >
          {IsUserUpVote ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54"
              />
            </svg>
          ) : (
            <HandThumbDownIcon className="h-6 w-6" />
          )}

          <span>Downvote ({data?.data?.downvotes?.length})</span>
        </button>
        <div className="ml-auto flex items-center space-x-2">
          <ChatBubbleLeftEllipsisIcon className="h-6 w-6 text-blue-500" />
          <span>Comments ({data?.data?.comments?.length})</span>
        </div>
      </div>

      {/* Ingredients Section */}
      <h2 className="text-2xl font-semibold text-default-gray-800 mb-3">
        Ingredients
      </h2>
      <ul className="list-disc list-inside mb-4 text-default-gray-700">
        {data?.data?.ingredients?.map((item: any) => (
          // eslint-disable-next-line react/jsx-key
          <li>
            {item.name}({item.quantity})
          </li>
        ))}
      </ul>

      {/* Instructions Section */}
      <h2 className="text-2xl font-semibold text-default-gray-800 mb-3">
        Instructions
      </h2>
      <ol className="list-decimal list-inside mb-4 text-default-gray-700">
        {data?.data?.instructions?.map((item: string) => <li>{item}</li>)}
      </ol>

      {/* User Information */}
      <div className="flex items-start justify-start mb-6 gap-1">
        {/* User Avatar */}
        <div className="flex items-start justify-start">
          <img
            src={data?.data?.user?.image}
            alt="User Avatar"
            className="h-12 w-12 rounded-full object-cover"
          />

          {/* User Information */}
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-default-gray-800">
              Posted by: {data?.data?.user?.name}
            </p>
            <p className="text-sm text-default-gray-500">
              Member since{" "}
              {`${monthNames[new Date(data?.data?.user?.createdAt).getMonth()]} ${new Date(data?.data?.user?.createdAt).getFullYear()}`}
            </p>
          </div>
        </div>

        {/* Follow/Unfollow Button */}

        {user?._id !== data?.data?.user?._id && (
          <div>
            {IsCurrentUserFollowRecipeCreater ? (
              <Chip
                onClick={() => handlefollowUnfollow("unFollow")}
                className="cursor-pointer"
                size="sm"
                color="primary"
                variant="shadow"
              >
                unFollow
              </Chip>
            ) : (
              <Chip
                onClick={() => handlefollowUnfollow("follow")}
                className="cursor-pointer"
                size="sm"
                color="primary"
                variant="shadow"
              >
                follow
              </Chip>
            )}
          </div>
        )}
      </div>

      {/* Comments Section */}
      <div className="max-w-2xl mt-6">
        <h2 className="flex item-start justify-start gap-2 text-2xl font-semibold text-default-gray-800 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97Z"
              clipRule="evenodd"
            />
          </svg>
          Comments
        </h2>

        <div className="space-y-6">
          {/* Comment 1 */}
          {data?.data?.comments?.map((cmnt: any) => (
            <div className="flex space-x-4">
              {/* User Avatar */}
              <Avatar
                src={cmnt?.user?.image}
                alt="User Avatar"
                className="w-10 h-10 rounded-full"
              />

              {/* Comment Body */}
              <div className="flex-1 bg-[#eee] bg-opacity-30 p-4 rounded-lg">
                <div className="flex justify-between">
                  <div>
                    {/* Comment User Name */}
                    <p className="font-semibold text-default-gray-800">
                      {cmnt?.user?.name}
                    </p>
                    {/* Comment Content */}
                    {isSelectEdit && editedcmntid == cmnt?._id ? (
                      <div>
                        <Input
                          className="w-[400px]"
                          value={selectEditComment}
                          onChange={(e) => setselectEditComment(e.target.value)}
                          type="text"
                          variant="bordered"
                        />
                        <Button
                          onClick={handleupdateComment}
                          size="sm"
                          color="primary"
                          variant="solid"
                        >
                          submit
                        </Button>
                      </div>
                    ) : (
                      <p className="text-default-gray-700">{cmnt?.comment}</p>
                    )}
                  </div>

                  {/* Edit/Delete Buttons */}
                  {cmnt?.user?._id == user?._id && (
                    <div className="flex item-start justify-start gap-2">
                      <button
                        onClick={() =>
                          handleditComment(cmnt?._id, cmnt?.comment)
                        }
                        className="text-blue-500 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteComment(cmnt?._id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>

                {/* Timestamp */}
                <p className="text-sm text-default-gray-500 mt-1">
                  {cmnt.createdAt && getRelativeTime(cmnt.createdAt)}
                </p>

                {/* Like/Reply Buttons */}
                <div className="mt-2 flex space-x-4 text-sm text-blue-500">
                  <button className="hover:underline">Like</button>
                  <button className="hover:underline">Reply</button>
                </div>

                {/* Edit Comment Form (Initially Hidden) */}
                <div className="mt-4 hidden">
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    rows={2}
                    placeholder="Edit your comment..."
                  ></textarea>
                  <div className="mt-2 flex justify-end space-x-2">
                    <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
                      Cancel
                    </button>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comment Input Box */}
        <CommentSection
          recipe={data?.data?._id}
          refetchRecipe={refetchRecipe}
        />
      </div>

      {/* rarting submit model  */}
      <>
        <Modal size={"lg"} isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalBody>
                  <h3 className="text-xl font-semibold mb-4">
                    Rate the Recipe
                  </h3>

                  {/* Star Rating in Modal */}
                  <div className="flex items-center justify-center mb-4">
                    {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        className={`h-8 w-8 cursor-pointer ${
                          index + 1 <= userRating
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => handleStarClick(index + 1)} // Set user rating
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>

                  <p className="text-lg text-center mb-4">{`Your Rating: ${userRating} Stars`}</p>

                  {/* Submit and Cancel Buttons */}

                  <Button
                    onClick={handleRatingSubmit}
                    color="primary"
                    variant="shadow"
                  >
                    Submit Rating
                  </Button>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    </>
  );
};

export default PostDetailsSection;
