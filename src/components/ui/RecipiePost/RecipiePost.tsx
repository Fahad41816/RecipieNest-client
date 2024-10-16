/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-sort-props */
"use client";

import React, { useState } from "react";
import RecipePostCard from "../post/PostCard";
import { useUserRecipe } from "@/src/hook/Recipie.hook";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import RecipeUpdateModel from "../../model/RecipeUpdateModel";

const RecipiePost = () => {

  const [userRecipies, refetchUserData] = useUserRecipe();
  

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [SelectedUpdateData, setSelectedUpdateData] = useState({});

  const handleOpen = (data: any) => {
    onOpen();
    setSelectedUpdateData(data);
  };

  return (
    <>
      {userRecipies?.data?.length <= 0 && (
        <div className="text-center font-bold text-2xl md:p-40">
          You Have No Recipe
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-4">
        {userRecipies?.data?.map((recipie: any) => (
          <RecipePostCard
            key={recipie._id}
            recipe={recipie}
            EditPermission={true}
            handleOpen={handleOpen}
          />
        ))}
      </div>

      {/* product update model  */}
      <Modal size={"full"} isOpen={isOpen} onClose={onClose}>
        <ModalContent className="overflow-scroll">
          {(onClose) => (
            <div>
              <ModalBody>
                <RecipeUpdateModel
                  setSelectedUpdateData={setSelectedUpdateData}
                  SelectedUpdateData={SelectedUpdateData}
                  onClose={onClose}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default RecipiePost;
