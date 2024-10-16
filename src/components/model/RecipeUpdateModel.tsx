/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
import { GetCurrentUser } from '@/src/services/AuthService';
import {  UpdateRecipeData } from '@/src/services/Recipie';
import { Button } from '@nextui-org/button'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import Tiptap from '../ui/Tiptap';
import { Input, Textarea } from '@nextui-org/input';
import { useUserRecipe } from '@/src/hook/Recipie.hook';

const RecipeUpdateModel = ({setSelectedUpdateData, SelectedUpdateData, onClose} :  any) => {

    const [ userRecipies, refetchUserData ] = useUserRecipe()

    const [formData, setFormData] : any = useState({
        title: "",
        image: "", 
        ingredients: [""], // Initialize with an empty string in the array
        description: "",
        cookingTime: "",
        instructions: [""],
        tags: [], // Tag array
      });
    
      // TypeScript users only add this code
    
      const [imagePreview, setImagePreview] = useState<string | null>(null);
      const [imageFile, setImageFile] = useState<File | null>(null);
      const [tagInput, setTagInput] = useState("");
      const [ingredients, setIngredients] = useState([
        { name: "", quantity: "", isGathered: true },
      ]);
    
      const handleIngredientChange = (
        index: number,
        field: string,
        value: string | boolean
      ) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients[index] = {
          ...updatedIngredients[index],
          [field]: value,
        };
        setIngredients(updatedIngredients);
      };
    
      const addIngredient = () => {
        setIngredients([
          ...ingredients,
          { name: "", quantity: "", isGathered: true },
        ]);
      };
    
      const removeIngredient = (index: number) => {
        const updatedIngredients = ingredients.filter((_, i) => i !== index);
        setIngredients(updatedIngredients);
      };
    
      // Handle input changes
      const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({ ...prev, [name]: value }));
      };
    
      // Handle array changes for instructions and ingredients
      const handleArrayChange = (index: number, field: string, value: string) => {
        const updatedArray = [...formData[field]];
        updatedArray[index] = value;
        setFormData((prev: any) => ({ ...prev, [field]: updatedArray }));
      };
    
      // Add new entry to instructions or ingredients
      const addNewField = (field: string) => {
        setFormData((prev: any) => ({
          ...prev,
          [field]: [...prev[field], ""],
        }));
      };
    
      // Handle image upload
      const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          setImageFile(file);
          setImagePreview(URL.createObjectURL(file)); // Create a preview URL
        }
      };
    
      const handleImageRemove = () => {
        setImagePreview(null); // Remove the preview
        setImageFile(null); // Reset the file input
      };
    
      // Handle rich text description
      const handleDescriptionChange = (value: string) => {
        setFormData((prev: any) => ({ ...prev, description: value }));
      };
    
      const [isAddProccess, setisAddProccess] = useState(false);
    
      // Submit form data
      const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
          setisAddProccess(true);
          let imageUrl = formData.image;
    
          // If an image file was selected, upload it to ImgBB
          if (imageFile) {
            const imageFormData = new FormData();
            imageFormData.append("image", imageFile);
    
            const response = await axios.post(
              `https://api.imgbb.com/1/upload?key=335c35b1bcfdd90384cd76f79928ad94`,
              imageFormData
            );
    
            imageUrl = response.data.data.display_url;
          }
    
          const finalFormData = {
            ...formData,
            image: imageUrl,
          };
    
          const user : any = await GetCurrentUser();
    
          const UpdateData = {
            title: finalFormData.title,
            description: finalFormData.description,
            ingredients: ingredients,
            instructions: finalFormData.instructions,
            cookingTime: finalFormData.cookingTime,
            image: finalFormData.image,
            user: user._id,
            tags: finalFormData.tags,
          };
    
          const responce = await UpdateRecipeData(SelectedUpdateData._id, UpdateData);
    
          if(responce.success){
            // Success message
            toast.success("Recipe Updated successfully!");
            setSelectedUpdateData({})
            setFormData({
              title: "",
              image: "", 
              ingredients: [""], // Initialize with an empty string in the array
              description: "",
              cookingTime: "",
              instructions: [""],
              tags: [], // Tag array
            })
            refetchUserData()
            onClose()
            
          }
          setisAddProccess(false);

        } catch (error) {
          toast.error("Error uploading recipe. Please try again.");
        }
      };
    
      const addTag = () => {
        if (tagInput.trim() !== "") {
          setFormData((prev: any) => ({
            ...prev,
            tags: [...prev.tags, tagInput.trim()],
          }));
          setTagInput(""); // Clear input after adding tag
        }
      };
    
      const handleTagChange = (e: any) => {
        setTagInput(e.target.value);
      };
    
      // Remove a tag
      const removeTag = (index: number) => {
        const updatedTags = [...formData.tags];
        updatedTags.splice(index, 1); // Remove the tag at the specified index
        setFormData((prev: any) => ({ ...prev, tags: updatedTags }));
      };

      useEffect(() => {
        setFormData(SelectedUpdateData)
        setIngredients(SelectedUpdateData.ingredients)
        setImagePreview(SelectedUpdateData.image)
        setTagInput(SelectedUpdateData.tags) 
      }, [SelectedUpdateData])
      

  return (
    <>
     <form
      onSubmit={handleSubmit}
      className="w-full  mt-10 p-6 rounded-lg shadow-md"
    >
      <h1 className="text-2xl font-bold mb-6 text-center">Upload Recipe</h1>

      {/* Image Upload */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">Upload Image</label>

        {imagePreview ? (
          <div className="relative w-48 h-48">
            <img
              src={imagePreview}
              alt="Recipe"
              className="object-cover w-full h-full rounded"
            />
            <button
              type="button"
              onClick={handleImageRemove}
              className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2"
            >
              ✕
            </button>
          </div>
        ) : (
          <>
            {/* Wrap dashed box in label to trigger hidden input on click */}
            <label htmlFor="imageUpload" className="cursor-pointer">
              <div className="w-[200px] h-[200px] border border-dashed flex justify-center items-center">
                <span className="text-3xl">+</span>
              </div>
            </label>
            {/* Hidden input */}
            <input
              id="imageUpload"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </>
        )}
      </div>

      {/* Title */}
      <div className="mb-4">
        <label className="block font-semibold">Title</label>
        <Input
          name="title"
          value={formData.title}
          onChange={handleChange}
          required={true}
          placeholder="Enter recipe title"
          className="w-full"
        />
      </div>

      {/* Description */}
      <div className="mb-4 ">
        <label className="block font-semibold">Description</label>
        <Tiptap onDescrptionChange={handleDescriptionChange} FormValue={SelectedUpdateData.description}/>
      </div>

      {/* Ingredients */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">Ingredients</label>

        {ingredients?.map((ingredient, index) => (
          <div key={index} className="mb-2 flex items-center space-x-4">
            {/* Ingredient Name */}
            <input
              type="text"
              placeholder="Name"
              value={ingredient.name}
              onChange={(e) =>
                handleIngredientChange(index, "name", e.target.value)
              }
              className="border rounded p-2"
            />

            {/* Quantity */}
            <input
              type="text"
              placeholder="Quantity"
              value={ingredient.quantity}
              onChange={(e) =>
                handleIngredientChange(index, "quantity", e.target.value)
              }
              className="border rounded p-2"
            />

            {/* isGathered Checkbox */}
            <input
              type="checkbox"
              checked={ingredient.isGathered}
              onChange={(e) =>
                handleIngredientChange(index, "isGathered", e.target.checked)
              }
            />
            <label>Gathered</label>

            {/* Remove Ingredient */}
            <button
              type="button"
              onClick={() => removeIngredient(index)}
              className="bg-red-600 text-white rounded p-2"
            >
              ✕
            </button>
          </div>
        ))}

        {/* Add Ingredient Button */}
        <button
          type="button"
          onClick={addIngredient}
          className="mt-2 bg-blue-500 text-white rounded p-2"
        >
          + Add Ingredient
        </button>
      </div>

      {/* Time Duration */}
      <div className="mb-4">
        <label className="block font-semibold">
          Time Duration (in minutes)
        </label>
        <Input
          name="timeDuration"
          required={true}
          value={formData.cookingTime}
          onChange={handleChange}
          placeholder="Enter time duration"
          className="w-full"
        />
      </div>

      {/* Instructions */}
      <div className="mb-4">
        <label className="block font-semibold">Instructions</label>
        {formData?.instructions?.map((instruction : string, index: number) => (
          <div key={index} className="mb-2 flex items-center space-x-2">
            <Textarea
              value={instruction}
              required={true}
              onChange={(e) =>
                handleArrayChange(index, "instructions", e.target.value)
              }
              placeholder="Enter instruction"
              className="w-full"
            />
            {index === formData?.instructions.length - 1 && (
              <Button
                onClick={() => addNewField("instructions")}
                color="primary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
            )}
          </div>
        ))}
      </div>

      {/* tags\  */}
      <div className="mb-4">
        <label className="block font-semibold">Tags</label>
        <div className="flex items-center space-x-2 mb-2">
          <Input
            value={tagInput}
            onChange={handleTagChange}
            placeholder="Enter a tag"
            className="w-full"
          />
          <Button onClick={addTag} color="primary">
            Add Tag
          </Button>
        </div>

        {/* Display added tags */}
        <div className="flex flex-wrap gap-2">
          {formData?.tags?.map((tag: string, index: number) => (
            <div
              key={index}
              className="flex items-center bg-default-gray-200 border p-1 rounded-lg"
            >
              <span>{tag}</span>
              <Button
                onClick={() => removeTag(index)}
                color="danger"
                size="sm"
                variant="light"
                className="ml-1"
              >
                x
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6 flex justify-center">
        <Button type="submit" fullWidth={true} disabled={isAddProccess} color="primary">
          Update Recipe
        </Button>
      </div>
    </form>
    </>
  )
}

export default RecipeUpdateModel