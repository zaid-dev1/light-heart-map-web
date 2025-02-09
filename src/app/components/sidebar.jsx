"use client";
import * as React from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { SidebarItem } from "./sidebarItem";
import { Drawer } from "antd";

export function Sidebar({ open = false, handleDrawer }) {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [authorizedUser, setAuthorizedUser] = React.useState(null);
  let pathname = usePathname();
  const router = useRouter();

  const noLayoutNeeded = ["/login", "/signup"];

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    setCurrentUser(user);
    setAuthorizedUser(JSON.parse(localStorage.getItem("currentUser")) !== null)
  }, [pathname]);

  const isAuthPage = noLayoutNeeded.includes(pathname);

  if (isAuthPage) {
    return <></>;
  }

  const onClose = () => {
    handleDrawer(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("location");
    router.push("/login");
  };
  return (
    <Drawer
      title="Basic Drawer"
      onClose={onClose}
      open={open}
      placement="left"
      width={280}
    >
      <div
        className={`sticky top-0 h-screen z-[200] sidebar  md:sidebar-expanded sidebar-collapsed bg-white shadow-sm`}
        style={{ maxHeight: "calc(100vh)" }}
      >
        <div
          className={`sidebar-inner flex flex-shrink-0 flex-col justify-between px-4 py-6 text-base bg-white  text-carbon-800 font-medium `}
          style={{ height: "calc(100vh - 70px)" }}
        >
          <div className="flex justify-center" onClick={onClose}>
            <Link href="/">
              <Image
                className="mx-2"
                src="/assets/svgs/logo.svg"
                width={160}
                height={55}
                alt="light heart"
              />
            </Link>
          </div>

          <div className="pt-12 flex-grow" onClick={onClose}>
            <SidebarItem
              icon="/assets/svgs/sidebar/dashboard.svg"
              route="/"
              name="Map"
            />
            {currentUser?.role !== "admin" && authorizedUser &&  <SidebarItem
              icon="/assets/svgs/sidebar/profile.svg"
              route={`/profile/${currentUser?.customerId}`}
              name="My Profile"
            />}
            {currentUser?.role === "admin" && authorizedUser &&  (
              <SidebarItem
                icon="/assets/svgs/icons/profile-icon.svg"
                route={`/users`}
                name="Users"
              />
            )}
          </div>
          <div className="p-4 max-w-sm">
            <h1 className="font-semibold text-2xl text-[#746253] mb-2">
              Need Help?
            </h1>
            <p className="text-gray-700 text-xs">Email us at:</p>
            <a
              href="mailto:help@lightheartlash.com"
              className="text-md text-gray-700 hover:text-[#746253]"
            >
              help@lightheartlash.com
            </a>
          </div>


        </div>
        { authorizedUser && 
          <div className="flex justify-center py-2 px-4 border-t-2">
          <button
            onClick={handleLogout}
            className="flex items-center text-customgray-1 hover:text-customgray-1 whitespace-nowrap py-3 px-8 mb-3 cursor-pointer text-base rounded-full  bg-primary text-[#746253] opacity-[45%] hover:bg-primary hover:opacity-75"
          >
            <img
              className="mr-2 rounded-full w-[25px] h-[25px] object-cover cursor-pointer"
              src="/assets/svgs/icons/logout.svg"
            />
            <p className="">Logout</p>
          </button>
        </div>}
      </div>
    </Drawer>
  );
}
