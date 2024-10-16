/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
import UsersSection from "@/src/components/Modules/Users/UsersSection";
import React from "react";

const page = () => {
  return (
    <>
      <div className="text-2xl font-bold mb-2">Users Managment</div>
      <section>
        <UsersSection/>
      </section>
    </>
  );
};

export default page;
