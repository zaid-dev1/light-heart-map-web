import Image from "next/image";
import React from "react";

export function ProfileCard({ user }) {
  function formatString(input) {
    return input
      ?.replace(/([a-z])([A-Z])/g, "$1 $2")
      ?.replace(/^./, (str) => str.toUpperCase());
  }

  return (
    <div className="lg:col-span-2 col-span-6 lg:mr-4 mr-0 flex flex-col items-center rounded-xl shadow-lg bg-white px-6 py-6 mt-4">
      <Image
        src="/assets/svgs/default-user.svg"
        width={155}
        height={155}
        alt="profile img"
      />
      <h3 className="text-2xl text-[#746253] mt-3">
        {user?.customer?.firstName} {user?.customer?.lastName}
      </h3>
      <p className=" text-secondary mt-1">
        {formatString(user?.customer?.role)}
      </p>
      <div className="mt-8 pt-10 border-t-2 w-full">
        <h3 className="text-xl text-[#746253] ">Services</h3>
        <div className="flex flex-wrap mt-3">
          {user?.businessDetails?.services ? (
            user?.businessDetails?.services
              ?.split(",")
              .map((service, index) => (
                <p
                  key={service + index}
                  className="text-secondary text-xs font-thin border border-secondary rounded-full px-3 py-2 mr-2 mt-2 "
                >
                  {service}
                </p>
              ))
          ) : (
            <p className="text-secondary ">No Services Added</p>
          )}
        </div>
      </div>
    </div>
  );
}
