/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
/* eslint-disable padding-line-between-statements */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable prettier/prettier */
"use client";

import { useRegisterUser } from "@/src/hook/auth.hook"; 
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type Inputs = {
  email: string;
  password: string;
  image: string;
  name: string;
  gender: string;
  confirmPassword: string;
  address: string;
};

const page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [ImageFile, setImageFile] = useState(null)


  // Function to toggle password visibility
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const password = watch("password");

  const {mutate : RegisterUser, isPending, isSuccess} =  useRegisterUser()

  const router = useRouter()

  useEffect(() => {
    if (!isPending && isSuccess) { 
        router.push("/login"); 
    }
  }, [isPending, isSuccess]);

  const onSubmit: SubmitHandler<Inputs> = async(data) => {
    
    

      try { 
        if (ImageFile) {
          // Create FormData for the image upload
          const formData = new FormData();
          formData.append("image", ImageFile);
  
          // Upload image to ImgBB
          const response = await axios.post(
            `https://api.imgbb.com/1/upload?key=335c35b1bcfdd90384cd76f79928ad94`,
            formData
          );

       
          
          
          const RegisterData : any = {
            name: data.name,
            email: data.email,
            gender: data.gender,
            password: data.password,
            image:response.data.data.display_url,
            address: data.address, 
          }
          
         
          RegisterUser(RegisterData)
            
        }
     
      } catch (error) {
       
        toast.error("Image upload failed");
      }
    };
  
     
  

  // Handle image upload
  const handleImageUpload = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl: any = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setImageFile(file)
    }
  };

  // Handle replace image (reset to null for re-upload)
  const handleReplaceImage = () => {
    setSelectedImage(null);
  };

  return (
    <section className="w-full flex items-center justify-center    p-4">
      <div className="w-full max-w-md border border-slate-200 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Image Upload */}
          <div className="flex flex-col items-center">
            {/* Circular image container */}
            <div className="relative">
              {selectedImage ? (
                <div className="w-32 h-32 rounded-full overflow-hidden border border-gray-300">
                  <img
                    src={selectedImage}
                    alt="Uploaded"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <label className="w-32 h-32 flex items-center justify-center  border-dashed text-gray-500 rounded-full cursor-pointer border border-gray-300">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  Upload Photo
                </label>
              )}
            </div>

            {/* Replace button (only shows after image upload) */}
            {selectedImage && (
              <button
                onClick={handleReplaceImage}
                className="mt-4 text-sm text-blue-500 hover:underline"
              >
                Replace Image
              </button>
            )}
          </div>

          {/* Name Input */}
          <Input
            type="text"
            label="Name"
            placeholder="Enter your name"
            {...register("name", { required: "Name is required" })}
            className={`w-full ${errors.name && "border-red-500 border"} rounded-md`}
          />
          {errors.name && (
            <span className="text-red-500 text-xs">This field is required</span>
          )}

          {/* Email Input */}
          <Input
            type="email"
            label="Email"
            placeholder="Enter your email"
            {...register("email", { required: "Email is required" })}
            className={`w-full ${errors.email && "border-red-500 border"} rounded-md`}
          />
          {errors.email && (
            <span className="text-red-500 text-xs">This field is required</span>
          )}

          {/* Password Input */}
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              label="Password"
              placeholder="Enter your password"
              {...register("password", { required: "Password is required" })}
              className={`w-full ${errors.password && "border-red-500 border"} rounded-md`}
            />
            {errors.password && (
              <span className="text-red-500 text-xs">
                This field is required
              </span>
            )}
            <span
              className="absolute right-4 top-[30%] cursor-pointer text-gray-500 hover:text-gray-700"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
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
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
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
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              )}
            </span>
          </div>

          {/* Confirm Password Input */}
          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              label="Confirm Password"
              placeholder="Confirm your password"
              {...register("confirmPassword", {
                required: "Confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className={`w-full ${errors.confirmPassword && "border-red-500 border"} rounded-md`}
            />
            {errors.confirmPassword && (
              <span className="text-red-500 text-xs">
                {errors.confirmPassword.message}
              </span>
            )}
            <span
              className="absolute right-4 top-[30%] cursor-pointer text-gray-500 hover:text-gray-700"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? (
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
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
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
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              )}
            </span>
          </div>

          {/* Address Input */}
          <Input
            type="text"
            label="Address"
            placeholder="Enter your address"
            {...register("address", { required: "Address is required" })}
            className={`w-full ${errors.address && "border-red-500 border"} rounded-md`}
          />
          {errors.address && (
            <span className="text-red-500 text-xs">This field is required</span>
          )}

          {/* Gender Input */}
          <Select
            variant={"bordered"}
            placeholder="Select Your Gender"
            {...register("gender", { required: "gender is required" })}
            label="gender"
          >
            <SelectItem key={"Male"}>Male</SelectItem>
            <SelectItem key={"Female"}>Female</SelectItem>
          </Select>

          {errors.gender && (
            <span className="text-red-500 text-xs">This field is required</span>
          )}

          {/* Register Button */}
          <Button
            className="w-full"
            type="submit"
            color="primary"
            variant="shadow"
            disabled={isPending}
          >
            Register
          </Button>

          {/* Sign In Link */}
          <div className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default page;
