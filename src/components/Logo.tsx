/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable prettier/prettier */
"use client";

import Image from "next/image";

import BlackLogo from "../assets/Blacklogo.png";
import WhiteLogo from "../assets/whitelogo.png";
import { useTheme } from "next-themes"; 
import React, { useEffect, useState } from "react";
const Logo = () => {
  
    const {theme, resolvedTheme} = useTheme()

   
    const [logo, setLogo] = useState(WhiteLogo); // Set initial logo

    useEffect(() => {
      // Change logo based on the theme
      if (theme === 'dark') {
        setLogo(WhiteLogo); // Set dark mode logo
      } else {
        setLogo(BlackLogo); // Set light mode logo
      }
    }, [theme]); // Re-run effect whenever theme changes
  
    
   

    return (
    <>   
      <Image
        width={200}
        height={200}
        src={logo}
        alt="Logo"
      />
        
    </>
  );
};

export default Logo;
