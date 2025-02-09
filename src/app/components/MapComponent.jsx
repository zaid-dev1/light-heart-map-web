"use client";
import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import useGoogleMapsApi from "../context/GoogleMapContext";
import Loading from "./uiComponents/loading";
import Image from "next/image";
import { Noto_Serif } from "next/font/google";
import { userCardIcons, userTypeIcons } from "../../../utils/constants";
import { useRouter } from "next/navigation";
import { message } from "antd";
import { getAllLightHQ } from "../api/lightHQ";

const notoSerif = Noto_Serif({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

const containerStyle = {
  width: "100%",
  height: "100%",
};

const MapComponent = ({ location, users, sortValue }) => {
  const GOOGLE_MAP_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY;
  const isLoaded = useGoogleMapsApi(GOOGLE_MAP_KEY);

  const [zoomLevel, setZoomLevel] = useState(17);
  const [activeMarker, setActiveMarker] = useState({ type: null, index: null });
  const [hqData, setHqData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const router = useRouter();

  const fetchHqData = async () => {
    setLoading(true);
    try {
      const response = await getAllLightHQ();
      if (response) {
        setHqData(response.data);
      } else {
        messageApi.error(response.message || "Failed to fetch Light Heart HQs.");
      }
    } catch (error) {
      console.error(error);
      messageApi.error("Something went wrong while fetching Light Heart HQs!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHqData();
  }, [location, sortValue]);

  const handleIconClick = (type, index) => {
    if (activeMarker.type === type && activeMarker.index === index) {
      setActiveMarker({ type: null, index: null });
    } else {
      setActiveMarker({ type, index });
    }
  };

  const handleProfileRouting = (user, hq) => {
    if (hq) {
      router.push(`/profile/${user.id}`);
    } else {
      router.push(`/profile/${user.customer.customerId}`);
    }
  };

  const handleMapClick = () => {
    setActiveMarker({ type: null, index: null });
  };

  const radiusToZoomLevel = () => {
    if (sortValue === 100) return 11;
    if (sortValue === 500) return 9;
    if (sortValue === 1000) return 7;
    if (sortValue === 10000) return 4;
  };

  useEffect(() => {
    setZoomLevel(radiusToZoomLevel(sortValue));
  }, [sortValue]);

  return (
    <div className="h-screen">
      {contextHolder}
      {(isLoaded || loading) && window.google ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{
            lat: location?.length && location[0],
            lng: location?.length && location[1],
          }}
          zoom={zoomLevel}
          onClick={handleMapClick}
        >
          {users?.map((user, index) => {
            if (user?.customer?.role !== "admin") {
              return (
                <Marker
                  key={`user-${index}`}
                  position={{
                    lat: +user?.businessProfile.latitude,
                    lng: +user?.businessProfile.longitude,
                  }}
                  icon={{
                    url: userTypeIcons[user?.customer?.role],
                    scaledSize: new window.google.maps.Size(40, 60),
                  }}
                  onClick={() => handleIconClick("user", index)}
                >
                  {activeMarker.type === "user" &&
                    activeMarker.index === index && (
                      <InfoWindow
                        position={{
                          lat: +user?.businessProfile.latitude,
                          lng: +user?.businessProfile.longitude,
                        }}
                      >
                        <div className={`w-[15rem] p-3 ${notoSerif.className}`}>
                          <div className="flex items-center">
                            <Image
                              src={userCardIcons[user?.customer?.role]}
                              width={40}
                              height={40}
                              alt={userCardIcons[user?.customer?.role]}
                            />
                            <h3 className="text-[#4B4B4B] text-xl ml-3 font-bold capitalize">
                              {user?.customer?.firstName}{" "}
                              {user?.customer?.lastName}
                            </h3>
                          </div>
                          <p className="text-[#787474] text-xs my-5">
                            {user.description ||
                              "This Artist Uses Light Heart Products."}
                          </p>
                          {user?.customer?.courses && 
                          <p className="ml-2 mb-1">
                          Courses Completed {"  "}-{"  "}
                            <span className="text-primary">
                              {user?.customer?.courses}
                            </span>
                          </p>}
                          <p className="ml-2 mb-1">
                            Business {"  "}-{"  "}
                            <span className="text-primary">
                              {user?.businessProfile?.name}
                            </span>
                          </p>
                          <p className="ml-2 mb-1">
                            Phone {"  "}-{"  "}
                            <span className="text-primary">
                              {user?.businessProfile?.businessPhone}
                            </span>
                          </p>
                          <p className="ml-2 mb-1">
                            Website {"  "}-{"  "}
                            <span className="text-primary cursor-pointer hover:underline">
                              {user?.businessProfile?.websiteLink ? (
                                <a
                                  href={user?.businessProfile?.websiteLink}
                                  target="_blank"
                                >
                                  {user?.businessProfile?.websiteLink}
                                </a>
                              ) : (
                                "No Website"
                              )}
                            </span>
                          </p>
                          <p className="ml-2 mb-1">
                            Instagram {"  "}-{"  "}
                            <span className="text-primary">
                              {user?.businessProfile?.instagramAccount ||
                                "No Account"}
                            </span>
                          </p>
                          <p className="ml-2 mb-1">
                            Address {"  "}-{"  "}
                            <span className="text-primary">
                              {user?.businessProfile?.address}
                            </span>
                          </p>
                          {localStorage.getItem("currentUser") !== null && <button
                            onClick={() => handleProfileRouting(user)}
                            className="bg-[#EDE6DE3D] border border-[#E8E8E8] w-full py-3 text-[#746253] rounded-md mt-5"
                          >
                            More Details
                          </button>}
                        </div>
                      </InfoWindow>
                    )}
                </Marker>
              );
            }
          })}
          {hqData?.map((hq, index) => {
            return (
              <Marker
                key={`hq-${index}`}
                position={{
                  lat: +hq.latitude,
                  lng: +hq.longitude,
                }}
                icon={{
                  url: "/assets/svgs/icons/lightHQ-icon.svg",
                  scaledSize: new window.google.maps.Size(40, 60),
                  anchor: new window.google.maps.Point(20, 30),
                }}
                onClick={() => handleIconClick("hq", index)}
              >
                {activeMarker.type === "hq" && activeMarker.index === index && (
                  <InfoWindow
                    position={{
                      lat: +hq.latitude,
                      lng: +hq.longitude,
                    }}
                  >
                    <div className={`w-[15rem] p-3 ${notoSerif.className}`}>
                      <div className="flex items-center">
                        <Image
                          src="/assets/svgs/icons/lightHQ-icon.svg"
                          width={40}
                          height={40}
                          alt="light HQ"
                        />
                        <h3 className="text-[#4B4B4B] text-xl ml-3 font-bold capitalize">
                          Light Heart HQ
                        </h3>
                      </div>
                      <p className="text-[#787474] text-xs my-5">
                        This is Light Heart Head Quarter.
                      </p>
                      <p className="ml-2 mb-2">
                        Allow Pick up {"  "}-{"  "}
                        <span className="text-primary">
                          {hq?.productPickupAvailable ? "Yes" : "No"}
                        </span>
                      </p>
                      <p className="ml-2 mb-2">
                        Website {"  "}-{"  "}
                        <span className="text-primary cursor-pointer hover:underline">
                          {hq?.websiteLink ? (
                            <a href={hq?.websiteLink} target="_blank">
                              {hq?.websiteLink}
                            </a>
                          ) : (
                            "No Website"
                          )}
                        </span>
                      </p>
                      <p className="ml-2 mb-2">
                        Instagram {"  "}-{"  "}
                        <span className="text-primary">
                          {hq?.instagramAccount || "No Account"}
                        </span>
                      </p>
                      <p className="ml-2 mb-2">
                        Address {"  "}-{"  "}
                        <span className="text-primary">{hq?.address}</span>
                      </p>
                    </div>
                  </InfoWindow>
                )}
              </Marker>
            );
          })}
        </GoogleMap>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default React.memo(MapComponent);
