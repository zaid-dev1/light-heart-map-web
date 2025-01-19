"use client";

import { Suspense, useEffect, useState } from "react";
import MapComponent from "./components/MapComponent";
import { HomeModal } from "./components/modals/HomeModal";
import { SearchSiderbar } from "./components/searchComponent";
import Loading from "./components/uiComponents/loading";
import { DEFAULT_LOCATION, Radius } from "../../utils/constants";
import { getNearByUsers } from "./api/user";

export default function Home() {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [userList, setUserList] = useState([]);
  const [sortValue, setSortValue] = useState(100);
  const [rolesArray, setRolesArray] = useState([]);

  useEffect(() => {
    fetchUserLocation();
    setIsPageLoaded(true);
  }, []);

  const fetchUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          localStorage.setItem(
            "location",
            JSON.stringify([latitude, longitude]),
          );
        },
        (error) => {
          if (error.code === 1) {
            setUserLocation(DEFAULT_LOCATION);
            localStorage.setItem("location", JSON.stringify(DEFAULT_LOCATION));
          }
        },
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  const fetchUsers = async (
    radius = Radius,
    roles = [],
    lat = userLocation[0],
    lng = userLocation[1],
    page = 1,
    limit = 100,
  ) => {
    const payload = {
      lat,
      lng,
      radius,
      page,
      limit,
      roles,
    };
    const response = await getNearByUsers(payload);
    setUserList(response);
  };

  useEffect(() => {
    if (userLocation) {
      fetchUsers(sortValue, rolesArray);
    }
  }, [userLocation]);

  if (!isPageLoaded) {
    return <Loading />;
  }

  return (
    <Suspense fallback={<Loading />}>
      <main>
        {userLocation && (
          <>
            <HomeModal setRolesArray={setRolesArray} fetchUsers={fetchUsers} />
            <MapComponent
              sortValue={sortValue}
              location={userLocation}
              users={userList?.customers}
            />
            <SearchSiderbar
              response={userList}
              sortValue={sortValue}
              handleSort={setSortValue}
              location={userLocation}
              fetchUsers={fetchUsers}
              setRolesArray={setRolesArray}
              rolesArray={rolesArray}
              handleLocationChange={setUserLocation}
            />
          </>
        )}
      </main>
    </Suspense>
  );
}
