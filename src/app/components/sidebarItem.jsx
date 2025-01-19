"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SidebarItem({ name, route, icon }) {
  const pathname = usePathname();
  const isActive = pathname === route;

  return (
    <Link
      href={route}
      className={`flex items-center text-customgray-1 hover:text-customgray-1 whitespace-nowrap py-3 px-2 mb-3 cursor-pointer text-base rounded-full transition-colors ${
        isActive
          ? "bg-primary text-[#746253] opacity-[45%] hover:bg-primary hover:opacity-75"
          : "hover:bg-primary  hover:opacity-25 "
      }`}
    >
      <Image className="mx-2" src={icon} width={20} height={20} alt={name} />

      <span className={`flex leading-tight md:ml-2`}>{name}</span>
    </Link>
  );
}
