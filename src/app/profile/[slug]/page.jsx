"use client";
import ProfileLayout from "../../components/ProfileLayout";
import InfoUnit from "../../components/uiComponents/infoUnit";
import SocialUnit from "../../components/uiComponents/socialUnit";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getCustomerById } from "../../api/user";

function Profile() {
  const { slug } = useParams();
  const [user, setUser] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  useEffect(() => {
    const fetchData = async () => {
      if (slug) {
        const res = await getCustomerById(slug);
        setUser(res);
      }
    };

    fetchData();
  }, [slug]);

  return (
    <ProfileLayout user={user}>
      <div className="relative z-[300]">
        <div className="flex justify-between items-center ">
          <h3 className="text-xl text-[#746253]">Basic Information</h3>
          {slug === currentUser.customerId && 
          <Link
            href={`${slug}/edit`}
            className="text-[#746253] flex items-center bg-primary rounded-full px-3 py-2"
          >
            <Image
              className="mr-2"
              src="/assets/svgs/icons/edit-icon.svg"
              width={12}
              height={12}
              alt="edit"
            />
            <span className="text-xs">Edit Profile</span>
          </Link>}
        </div>
        <div className="grid grid-cols-6 mt-6">
          <InfoUnit heading="Phone #" value={user?.customer?.phone || "-"} />
          <InfoUnit heading="Email" value={user?.customer?.email || "-"} />
          <InfoUnit
            heading="Business Name"
            value={user?.businessDetails?.name || "-"}
          />
          <InfoUnit
            heading="Business Address"
            value={user?.businessDetails?.address || "-"}
          />
          <InfoUnit
            heading="Business Phone #"
            value={user?.businessDetails?.businessPhone || "-"}
          />
          <InfoUnit
            heading="Courses"
            value={user?.customer?.courses || "-"}
          />
        </div>
        <div className="mt-12">
          <h3 className="text-xl text-[#746253]">Social Media</h3>
          <div className="grid grid-cols-5 flex items-center">
            <SocialUnit
              icon="/assets/svgs/icons/insta-icon.svg"
              value={user?.businessDetails?.instagramAccount || "-"}
            />
            <SocialUnit
              icon="/assets/svgs/icons/web-icon.svg"
              value={user?.businessDetails?.websiteLink || "-"}
            />
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
}

export default Profile;
