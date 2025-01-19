"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isAuthPaths } from "../../../utils/constants";

export function Header({ handleDrawer }) {
  const pathname = usePathname();

  const showDrawer = () => {
    handleDrawer((prev) => !prev);
  };

  return (
    <div
      className={`fixed flex justify-center items-center px-10 bg-white shadow-b-lg h-[65px] w-full z-[200] ${!isAuthPaths.includes(pathname) && "justify-between"}`}
    >
      {!isAuthPaths.includes(pathname) && (
        <button onClick={showDrawer}>
          <Image
            src="/assets/svgs/icons/toggle-btn.svg"
            width={25}
            height={25}
            alt="toggle btn"
          />
        </button>
      )}
      <Link href="/">
        <Image
          src="/assets/svgs/logo.svg"
          width={160}
          height={55}
          alt="Lash Atrist"
        />
      </Link>
      <span></span>
    </div>
  );
}
