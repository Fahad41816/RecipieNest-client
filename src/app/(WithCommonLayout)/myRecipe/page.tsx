/* eslint-disable react/jsx-sort-props */
/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import RecipiePost from "@/src/components/ui/RecipiePost/RecipiePost"; 
import Link from "next/link";

const page = () => {
  return (
    <div>
      <h1 className="text-center text-2xl font-bold font-sans my-4">
        {" "}
        My Recipe
      </h1>

      <div className="mt-5">
        <Link href="/create-recipe" >
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Add Recipe +
          </button>
        </Link>
      </div>

      {/* Recipe Post Section  */}
      <RecipiePost />
    </div>
  );
};

export default page;
