/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable react/jsx-key */
/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */

"use client";

import { useAllRecipies } from "@/src/hook/Recipie.hook";
import { changeRecipiePrimiumStatus, changeRecipieStatus, DeleteRecipie } from "@/src/services/Recipie";
import Image from "next/image";
import React from "react";
import { toast } from "sonner";

const RecipiesSection = () => {
  const [Recipies, refetch] = useAllRecipies();

  const handleRecipiStatuschange = async(id: string, status: string) => {
   
     const Responce  = await  changeRecipieStatus(id, status)

     if(Responce.success){
      toast.success('Recipie Status Changed!')
      refetch()
     }
  }
  const handleRecipiePremiumStatusChange = async(id: string, status: boolean) => {
     

    const Responce  = await  changeRecipiePrimiumStatus(id, status)

    if(Responce.success){
     toast.success('Recipie Status Changed!')
     refetch()
    }
  }
  const HandleDeleteRecipie = async(id: string) => {
     const Responce  = await  DeleteRecipie(id)

    if(Responce.success){
     toast.success('Recipie Deleted!')
     refetch()
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full  border border-gray-200">
          <thead>
            <tr className="">
              <th className="px-4 py-2 text-left text-sm font-semibold  ">
                Image
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold  ">
                Title
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold  ">
                Rating
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold ">
                Premium
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold ">
                Status
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold  ">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {/* Example row */}
            {Recipies?.data?.map((recipie: any) => (
              <tr className="border-t border-gray-200">
                <td className="px-4 py-2">
                  <div className="w-16 h-16">
                    <Image
                      src={recipie?.image} // Example image path
                      alt={recipie?.title}
                      width={64}
                      height={64}
                      className="object-cover rounded"
                    />
                  </div>
                </td>
                <td className="px-4 py-2 text-sm">{recipie?.title}</td>
                <td className="px-4 py-2 text-sm">{recipie?.avgRating}</td>
                <td className="px-4 py-2 text-sm">
                  <span className="text-green-500">{recipie?.isPremiumContent ? "Yes" : "No"}</span>
                </td>
                <td className="px-4 py-2 text-sm">
                  <span className="text-yellow-500">{recipie?.status}</span>
                </td>
                <td className="px-4 py-2 text-sm">
                  <div className="flex space-x-2">
                    {/* Toggle status button */}
                    {recipie.status == 'approval' ?  <button onClick={()=> handleRecipiStatuschange(recipie._id, 'pending')} className="px-2 py-1 bg-yellow-500 text-white rounded text-xs hover:bg-yellow-600">
                      Set Pending
                    </button>:  <button onClick={()=> handleRecipiStatuschange(recipie._id, 'approval')} className="px-2 py-1 bg-yellow-500 text-white rounded text-xs hover:bg-yellow-600">
                      Set approval
                    </button> }
                   
                    {/* Toggle premium status button */}
                    {
                      recipie?.isPremiumContent ? <button onClick={()=>handleRecipiePremiumStatusChange(recipie._id, false)}  className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600">
                      Cancle Premium
                    </button> : <button onClick={()=>handleRecipiePremiumStatusChange(recipie._id, true)} className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600">
                      set Premium
                    </button>
                    }
                    
                    <button onClick={()=> HandleDeleteRecipie(recipie._id)} className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600">
                      Delete
                    </button> 

                  </div>
                </td>
              </tr>
            ))}

            {/* Repeat for each recipe */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecipiesSection;
