/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable react/self-closing-comp */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prettier/prettier */
"use client";
 
import Image from "next/image";
import React from "react";
import Banner from "@/src/assets/Banner.png";

const Landing = () => { 

  return (
    <>
     <div className="max-w-7xl overflow-hidden">
        <Image width={1300} height={450} src={Banner} alt="ImageBanner"/>
     </div>
    </>
  );
};

export default Landing;
