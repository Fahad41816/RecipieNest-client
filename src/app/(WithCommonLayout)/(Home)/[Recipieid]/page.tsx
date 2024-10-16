/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-key */
/* eslint-disable import/order */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable prettier/prettier */
import React from "react";

import PostDetailsSection from "@/src/components/Modules/PostDetails/PostDetails";

interface IProps {
  params: {
    Recipieid: string;
  };
}

const RecipeDetailsPage = async ({ params }: IProps) => {
 
 
  return (
    <div className="max-w-7xl mx-auto p-6 bg-default-gray-50 rounded-lg shadow-md">
      {/* Recipe Title */}
      <PostDetailsSection RecipeId={params.Recipieid}/>
    </div>
  );
};

export default RecipeDetailsPage;
