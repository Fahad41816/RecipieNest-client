/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/label-has-associated-control */
"use client";
import { useEffect, useState } from "react";
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button"; 
import useUserProfile, { updateUserProfile } from "@/src/hook/profile.hook";
import { Avatar } from "@nextui-org/avatar"; 
import axios from "axios";
import Link from "next/link"; 

const ProfilePage = () => {
  // State for edit mode and user info
  const [editMode, setEditMode] = useState(false);
  const [userInfo, setUserInfo] : any = useState({});
  const [changesImgFile, setChangesImgFile] = useState()
    

  const [ProfileData, refetch, isPending, isSuccess] : any = useUserProfile()

  const {mutate : UpdateProfile} = updateUserProfile() 
    

  // State for form inputs
  const [formData, setFormData] : any = useState({
    name: userInfo?.name,
    address: userInfo?.address,
    bio: userInfo?.bio,
    image: userInfo?.image,
    email : userInfo?.email,
    isPremiumMember : userInfo?.isPremiumMember 
  });

  useEffect(()=>{
    if(isSuccess && !isPending){
      setUserInfo(ProfileData.data)
      setFormData({
        name: ProfileData.data?.name,
        address: ProfileData.data?.address,
        bio: ProfileData.data?.bio,
        image: ProfileData.data?.image,
        email : ProfileData.data?.email,
        isPremiumMember : ProfileData?.data?.isPremiumMember 
      })
    }

    

  },[ProfileData, isSuccess, isPending])

  // Handle image upload
  const handleImageUpload = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev : any) => ({ ...prev, image: imageUrl }));
      setChangesImgFile(file)
    }
  };

  // Handle input changes
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev : any) => ({ ...prev, [name]: value }));
  };

  // Save updated user info
  const saveChanges = async() => {
    // setUserInfo((prev : any) => ({
    //   ...prev,
    //   name: formData.name,
    //   bio: formData.bio,
    //   image: formData.image,
    // }));

    if(changesImgFile){

      const formdata = new FormData();
      formdata.append("image", changesImgFile);
  
      // Upload image to ImgBB
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=335c35b1bcfdd90384cd76f79928ad94`,
        formdata
      ); 
      formData.image = response.data.data.display_url 
    }
   

    // Trigger the mutation to update the user profile
    UpdateProfile(formData, {
      onSuccess: () => { 
        // Refetch the profile data after update
        refetch();
        setEditMode(false);
      }, 
    });
  
    setEditMode(false); 
  };

  // Cancel editing
  const cancelChanges = () => {
    setFormData(userInfo); 
    setEditMode(false);
  };

 

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6     rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">My Profile</h1>
      
      <div className="flex flex-col items-center justify-center mb-6">
        <div className="relative">
          {/* Display or edit profile image */}
          {editMode ? (
            <label className="cursor-pointer">
              <div className="w-32 h-32 rounded-full overflow-hidden border border-gray-300">
                <img
                  src={formData.image}
                  alt="Profile"
                  className="object-cover w-full h-full"
                />
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          ) : (
            <div>
              <Avatar src={userInfo?.image} className="w-20 h-20 text-large" /> 
            </div>
          )}
        </div>

        {/* Follower & Following Count */}
        <div className="flex items-center mt-4 space-x-6">
          <div className="text-center">
            <p className="text-lg font-semibold">{userInfo?.followers?.length}</p>
            <p className="text-gray-500">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold">{userInfo?.following?.length}</p>
            <p className="text-gray-500">Following</p>
          </div>
        </div>

        {/* Profile Status */}
        <div className="mt-4">
          <span className={`px-3 py-1 text-sm rounded-full ${
            userInfo?.status === "in-progress" ? "bg-green-100 text-green-600" : "bg-green-100 text-green-600"
          }`}>
            {userInfo?.status}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {/* Name field */}
        <div>
          <label className="block font-semibold">Name</label>
          {editMode ? (
            <Input
              value={formData.name}
              onChange={handleChange}
              name="name"
              placeholder="Enter your name"
              className="w-full"
            />
          ) : (
            <p className="text-gray-700">{userInfo?.name}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold">Email</label>
          {editMode ? (
            <Input
              value={formData.email}
              onChange={handleChange}
              name="email"
              disabled={true}
              placeholder="Enter your name"
              className="w-full"
            />
          ) : (
            <p className="text-gray-700">{userInfo?.email}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold">Adress</label>
          {editMode ? (
            <Input
              value={formData.address}
              onChange={handleChange}
              name="address"
              placeholder="Enter your name"
              className="w-full"
            />
          ) : (
            <p className="text-gray-700">{userInfo?.address}</p>
          )}
        </div>

        {/* Bio field */}
        <div>
          <label className="block font-semibold">Bio</label>
          {editMode ? (
            <Textarea
              value={formData.bio}
              onChange={handleChange}
              name="bio"
              placeholder="Tell something about yourself"
              className="w-full"
              rows={4}
            />
          ) : (
            <p className="text-gray-700">{userInfo?.bio}</p>
          )}
        </div>

        {/* Premium Membership Status */}
        <div>
          <label className="block font-semibold">Premium Membership</label>
          {userInfo?.isPremiumMember  ? (
            <p className="text-green-600 font-semibold">Active</p>
          ) : (
            <div className="flex items-center space-x-2">
              <Link href={'/payment'}>
              <p className="text-red-600 font-semibold">Inactive</p>
              <Button   radius="sm" color="warning">
                Subscribe to Premium
              </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Edit/Save/Cancel buttons */}
      <div className="mt-6 flex justify-center space-x-4">
        {editMode ? (
          <>
            <Button onClick={saveChanges} color="success">
              Save Changes
            </Button>
            <Button onClick={cancelChanges} color="danger" variant="light">
              Cancel
            </Button>
          </>
        ) : (
          <Button onClick={() => setEditMode(true)} color="primary">
            Edit Profile
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
