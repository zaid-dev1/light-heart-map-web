import Image from "next/image";
import React from "react";
import { ProfileCard } from "./profileCard";

function ProfileLayout({ children, user }) {
  return (
    <div className="py-10 lg:px-16 px-6 bg-[#f7f9f9]">
      <button className="flex items-center mb-2">
        <Image
          className="mr-2"
          src={`${user?.image ? user.image : "/assets/svgs/icons/back-arrow.svg"}`}
          width={20}
          height={17}
          alt="back"
        />
        Back
      </button>
      <div className="grid grid-cols-6">
        <ProfileCard user={user} />
        <div className="relative lg:col-span-4 col-span-6 lg:ml-4 ml-0 rounded-xl shadow-lg bg-white lg:px-10 px-6 py-6 mt-4">
          <div
            className="absolute inset-0 bg-center bg-no-repeat bg-contain opacity-[10%] "
            style={{ backgroundImage: "url('/assets/svgs/loading-img.svg')" }}
          ></div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default ProfileLayout;
