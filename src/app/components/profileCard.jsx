import Image from "next/image";
import React from "react";
import { userCardIcons } from "../../../utils/constants";

export function ProfileCard({ user }) {
  function formatString(input) {
    return input
      ?.replace(/([a-z])([A-Z])/g, "$1 $2")
      ?.replace(/^./, (str) => str.toUpperCase());
  }

  return (
    <div className="lg:col-span-2 col-span-6 lg:mr-4 mr-0 flex flex-col items-center rounded-xl shadow-lg bg-white px-6 py-6 mt-4">
      <Image
        src={userCardIcons[user?.customer?.role] ? userCardIcons[user?.customer?.role] : '/assets/svgs/icons/lightHQ-icon.svg'}
        width={100}
        height={100}
        alt={userCardIcons[user?.customer?.role]}
      />
      <h3 className="text-2xl text-[#746253] mt-3">
        {user?.businessDetails?.name
          ? user.businessDetails.name.charAt(0).toUpperCase() + user.businessDetails.name.slice(1)
          : ""}
      </h3>
      <p className=" text-secondary mt-1">
        {formatString(user?.customer?.role)}
      </p>
    </div>
  );
}
