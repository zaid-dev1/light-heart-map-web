"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  AutoComplete,
  Checkbox,
  Dropdown,
  Input,
  Pagination,
  Select,
} from "antd";
import useGoogleMapsApi from "../context/GoogleMapContext";
import {
  allRoles,
  FILTEROPTIONS,
  PageLimit,
  SORTOPTIONS,
} from "../../../utils/constants";
import { useRouter } from "next/navigation";
import { userCardIcons, userTypeIcons } from "../../../utils/constants";

export function SearchSiderbar({
  handleLocationChange,
  response,
  fetchUsers,
  handleSort,
  sortValue,
  rolesArray,
  setRolesArray,
  isLoading
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [address, setAddress] = useState("");
  const [open, setOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});

  const router = useRouter();
  const GOOGLE_MAP_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY;
  const isLoaded = useGoogleMapsApi(GOOGLE_MAP_KEY);

  useEffect(() => {
    const rolesObject = allRoles.reduce((acc, role) => {
      acc[role] = rolesArray.includes(role);
      return acc;
    }, {});
    setCheckedItems(rolesObject);
  }, [rolesArray]);

  const handleAddressChange = (value) => {
    if (isLoaded && window.google) {
      try {
        setAddress(value);
        if (value) {
          const autocompleteService =
            new window.google.maps.places.AutocompleteService();
          autocompleteService.getPlacePredictions(
            { input: value },
            (predictions, status) => {
              if (
                status === window.google.maps.places.PlacesServiceStatus.OK &&
                predictions
              ) {
                setOptions(
                  predictions.map((prediction) => ({
                    value: prediction.description,
                    placeId: prediction.place_id,
                  })),
                );
              }
            },
          );
        } else {
          setOptions([]);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleClearSearch = () => {
    const currentLocation = JSON.parse(localStorage.getItem("location"));
    setAddress("");
    handleLocationChange(currentLocation);
  };

  const handleSelect = (value, option) => {
    if (isLoaded && window.google) {
      try {
        setAddress(value);
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ placeId: option.placeId }, (results, status) => {
          if (status === "OK") {
            const location = results[0]?.geometry.location;
            const newLocation = [location.lat(), location.lng()];
            handleLocationChange(newLocation);
          } else {
            console.error(
              "Geocode was not successful for the following reason: " + status,
            );
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleFilteringByRadius = (value) => {
    const rolesArray = Object.keys(checkedItems).filter(
      (key) => checkedItems[key],
    );
    handleSort(value);
    fetchUsers(value, rolesArray);
  };

  const handleFiltering = () => {
    const rolesArray = Object.keys(checkedItems).filter(
      (key) => checkedItems[key],
    );
    setRolesArray(rolesArray);
    fetchUsers(sortValue, rolesArray);
    setOpen(false);
  };

  const handlePagination = (page) => {
    fetchUsers(sortValue, rolesArray, undefined, undefined, page, PageLimit);
  };

  const handleCheckboxChange = (key) => {
    setCheckedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleMenuClick = (e) => {
    e.stopPropagation();
  };

  const handleRouting = (user) => {
    router.push(`/profile/${user.customer.customerId}`);
  };

  const handleProfileRouting = (user, hq) => {
    if (hq) {
      router.push(`/profile/${user.id}`);
    } else {
      router.push(`/profile/${user.customer.customerId}`);
    }
  };

  const menu = (
    <div className="p-4 px-6 bg-white border border-[#E8E8E8] showdow-sm rounded-lg">
      <div onClick={handleMenuClick}>
        {FILTEROPTIONS.map((item) => (
          <div key={item.value} className="flex items-center mb-2">
            <Checkbox
              checked={checkedItems[item.value]}
              onChange={() => handleCheckboxChange(item.value)}
            >
              {item.label}
            </Checkbox>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <button
          className=" bg-[#746253] text-white px-4 py-1 rounded-lg"
          onClick={handleFiltering}
        >
          Filter
        </button>
      </div>
    </div>
  );

  return (
    <div
      className={`fixed top-[5rem] h-[88vh] py-2 mb-10 z-[300] bg-white rounded-xl ${!isOpen ? "left-[-20px]" : "left-[15px]"}`}
    >
      {isOpen ? (
        <button
          className="absolute right-[-1rem] top-[-0.5rem]"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <Image
            src="/assets/svgs/icons/close-icon.svg"
            width={45}
            height={45}
            alt="close"
          />
        </button>
      ) : (
        <button
          className="relative right-[-1.25rem] top-[-1rem]"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <Image
            src="/assets/svgs/icons/open-icon.svg"
            width={45}
            height={45}
            alt="open"
          />
        </button>
      )}

      <div
        className={`h-full w-full mt-2 overflow-scroll py-6 px-4  ${!isOpen ? "hidden" : "w-[320px]"}`}
      >
        <AutoComplete
          value={address}
          options={options}
          onChange={handleAddressChange}
          onSelect={handleSelect}
          className="w-full"
        >
          <Input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full  pt-4 pb-2 text-gray-800 bg-[#EDE6DE3D] outline-none border border-[#E8E8E8] focus:border-indigo-600 shadow-sm rounded-lg"
            suffix={
              <Image
                src={
                  address
                    ? "assets/svgs/icons/close-btn.svg"
                    : "/assets/svgs/icons/search-icon.svg"
                }
                onClick={handleClearSearch}
                width={20}
                height={20}
                alt="search"
              />
            }
            placeholder="Search Light Heart Map"
          />
        </AutoComplete>

        <div className="mt-5 flex justify-between">
          <div className="w-[75%]">
            <label className="font-medium w-full my-1 text-[#545454] text-sm">
              Find By radius
            </label>
            <Select
              defaultValue="100"
              size="large"
              value={sortValue}
              className="w-full  text-gray-800 bg-[#EDE6DE3D] outline-none rounded-lg"
              onChange={handleFilteringByRadius}
              options={SORTOPTIONS}
            />
          </div>

          <div className="flex flex-col">
            <label className="font-medium w-full my-1 text-[#545454] text-sm">
              Filter
            </label>

            <Dropdown
              overlay={menu}
              trigger={["click"]}
              open={open}
              onOpenChange={(visible) => setOpen(visible)}
            >
              <button className="mt-2" onClick={(e) => e.preventDefault()}>
                <Image
                  src="/assets/svgs/icons/filter-icon.svg"
                  width={40}
                  height={40}
                  alt="filter"
                />
              </button>
            </Dropdown>
          </div>
        </div>

        <div className="my-8">
          {isLoading && <div className="px-2">
            Loading...
          </div>}
          {response?.customers && response?.customers.length > 0 ? (
            response?.customers?.map((user) => {
              if (user.customer?.role !== "admin") {
                return (
                  <div
                    className="flex items-start mb-4 pb-4 border-b-2 border-[#5B5B5B]"
                    key={user?.customer?.id}
                  >
                    <Image
                      src={userCardIcons[user?.customer?.role] ? userCardIcons[user?.customer?.role]
                        : "/assets/svgs/default-user.svg"
                      }
                      width={100}
                      height={100}
                      alt="img"
                    />
                    <div className="ml-6">

                      <button
                        onClick={() => handleProfileRouting(user)}
                        className="py-2 text-[#746253] rounded-md mt-5"
                      >
                        {user?.businessProfile?.name
                          ? user.businessProfile.name.charAt(0).toUpperCase() + user.businessProfile.name.slice(1)
                          : ""}
                      </button>
                      <div className="flex items-center mt-2">
                        <Image
                          src={userCardIcons[user?.customer?.role] ? userCardIcons[user?.customer?.role]
                            : "/assets/svgs/default-user.svg"
                          }
                          width={16}
                          height={16}
                          alt="icon"
                        />
                        <p className="ml-3 text-[#5B5B5B] text-sm capitalize">
                          {user?.customer?.role}
                        </p>
                      </div>
                      <div className="flex items-center mt-2">
                        <Image
                          src="/assets/svgs/icons/location-icon.svg"
                          width={16}
                          height={16}
                          alt="icon"
                        />
                        <p className="ml-3 text-[#5B5B5B] text-sm">
                          {(user?.businessProfile?.address).slice(0, 30)}.
                        </p>
                      </div>
                      {user?.businessProfile?.instagramAccount && (
                        <div className="flex items-center mt-2">
                          <Image
                            src="/assets/svgs/icons/social-icon.svg"
                            width={16}
                            height={16}
                            alt="icon"
                          />
                          <p className="ml-3 text-[#5B5B5B] text-sm">
                            {user?.businessProfile?.instagramAccount}
                          </p>
                        </div>
                      )}
                      {user?.businessProfile?.websiteLink && (
                        <div className="flex items-center mt-2">
                          <Image
                            src="/assets/svgs/icons/social-icon.svg"
                            width={16}
                            height={16}
                            alt="icon"
                          />
                          <p className="ml-3 text-[#5B5B5B] text-sm  cursor-pointer">
                            {user?.businessProfile?.websiteLink}
                          </p>
                        </div>
                      )}
                      <div className="flex items-center mt-2">
                        <Image
                          src="/assets/svgs/icons/view-profile.svg"
                          width={16}
                          height={16}
                          alt="icon"
                        />
                        <button
                          className="ml-3 text-[#5B5B5B] text-sm"
                          onClick={() => {
                            handleRouting(user);
                          }}
                        >
                          Visit Profile
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }
            })
          ) : (
            <p className="text-[#746253] p-4 bg-[#F0F0F0] text-xs mt-[5rem]">
              There are no results found based on your current search
            </p>
          )}
        </div>
        {response?.customers && response.customers?.length > 10 && (
          <div className="flex justify-center">
            <Pagination
              current={response?.pagination?.page}
              total={response?.pagination?.total}
              pageSize={PageLimit}
              onChange={handlePagination}
              className="my-4"
            />
          </div>
        )}
      </div>
    </div>
  );
}
