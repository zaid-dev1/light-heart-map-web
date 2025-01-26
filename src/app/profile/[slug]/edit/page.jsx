"use client";
import { getCustomerById, updateBusinessDetails } from "../../../api/user";
import { UploadImgModal } from "../../../components/modals/uploadImgModal";
import ProfileLayout from "../../../components/ProfileLayout";
import CustomInput from "../../../components/uiComponents/InputField";
import Loading from "../../../components/uiComponents/loading";
import useGoogleMapsApi from "../../../context/GoogleMapContext";
import { AutoComplete, Form, Input, message, Select } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Profile() {
  const [form] = Form.useForm();

  const [showModal, setShowModal] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [businessAddress, setBusinessAddress] = useState("");
  const [businessLatLon, setBusinessLatLon] = useState([]);
  const [businessOptions, setBusinessOptions] = useState([]);
  const [user, setUser] = useState(null);
  const [userResponse, setUserResponse] = useState(null);

  const GOOGLE_MAP_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY;
  const isLoaded = useGoogleMapsApi(GOOGLE_MAP_KEY);
  const [messageApi, contextHolder] = message.useMessage();

  const { slug } = useParams();
  const router = useRouter();

  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (slug) {
        const res = await getCustomerById(slug);
        const userData = {
          name: `${res?.customer?.firstName || ""} ${res?.customer?.lastName || ""}`,
          email: res?.customer?.email,
          phone: res?.customer?.phone || "",
          address:
            res?.customer?.addresses?.[0]?.address1 +
            res?.customer?.addresses?.[0]?.address2 +
            res?.customer?.addresses?.[0]?.city +
            res?.customer?.addresses?.[0]?.province +
            res?.customer?.addresses?.[0]?.country,
          businessName: res?.businessDetails?.name,
          businessPhone: res?.businessDetails?.businessPhone,
          services: res?.businessDetails?.services?.split(","),
          courses: res?.customer?.courses?.split(","),
          instagramAccount: res?.businessDetails?.instagramAccount,
          websiteLink: res?.businessDetails?.websiteLink,
        };
        setUserResponse(res);
        setUser(userData);
        setBusinessAddress(res?.businessDetails?.address);
        setBusinessLatLon([
          res?.businessDetails?.latitude,
          res?.businessDetails?.longitude,
        ]);
      }
    };

    fetchData();
  }, [slug]);

  useEffect(() => {
    if (user) {
      form.setFieldsValue(user);
    }
  }, [user, form]);

  const handleBusinessAddressChange = (value) => {
    if (isLoaded && window.google) {
      try {
        setBusinessAddress(value);
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
                setBusinessOptions(
                  predictions.map((prediction) => ({
                    value: prediction.description,
                    placeId: prediction.place_id,
                  })),
                );
              }
            },
          );
        } else {
          setBusinessOptions([]);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleBusinessSelect = (value, option) => {
    if (isLoaded && window.google) {
      try {
        setBusinessAddress(value);
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ placeId: option.placeId }, (results, status) => {
          if (status === "OK") {
            const location = results[0]?.geometry.location;
            const newLocation = [location.lat(), location.lng()];
            setBusinessLatLon(newLocation);
          } else {
            console.error("Geocode failed: " + status);
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleSubmitProfile = async (values) => {
    const payload = {
      name: values?.businessName,
      address: businessAddress,
      instagramAccount: values?.instagramAccount,
      websiteLink: values?.websiteLink,
      businessPhone: values?.businessPhone,
      latitude: +businessLatLon[0] || 0,
      longitude: +businessLatLon[1] || 0,
      services: values?.services?.join(",") || "",
      // courses: values?.courses?.join(",") || "",
    };

    try {
      const res = await updateBusinessDetails(payload, slug);
      messageApi.success(res?.message);
      router.push(`/profile/${slug}`);
    } catch (error) {
      messageApi.error(
        error?.response?.data?.message || "Something went wrong",
      );
    }
  };

  if (!isPageLoaded) {
    return <Loading />;
  }

  return (
    <ProfileLayout user={userResponse}>
      {contextHolder}
      <UploadImgModal showModal={showModal} handleModal={setShowModal} />
      <div className="relative z-[300]">
        <Form form={form} onFinish={handleSubmitProfile}>
          <div>
            <div className="flex justify-between items-center">
              <h3 className="text-xl text-[#746253]">Basic Information</h3>
              <div className="flex">
                <Link
                  href={`/profile/${slug}`}
                  className="text-[#993456] text-xs rounded-full px-5 py-2 mr-3 mt-4"
                >
                  Cancel
                </Link>
                <Form.Item className="mt-4">
                  <button
                    type="submit"
                    className="text-[#746253] text-xs bg-primary rounded-full px-5 py-2"
                  >
                    Save
                  </button>
                </Form.Item>
              </div>
            </div>
            {/* <div className="flex justify-end">
              <button
                className="text-[#746253] text-xs bg-primary rounded-full px-5 py-2"
                onClick={(e) => {
                  setShowModal(true);
                  e.preventDefault();
                }}
              >
                Update Profile Picture
              </button>
            </div> */}
          </div>
          <div className="grid grid-cols-2 mt-6">
            <Form.Item
              className="relative md:col-span-1 col-span-2 mr-3"
              name="name"
            >
              <CustomInput
                labelText="Name"
                type="text"
                placeholder="Shawn Murphy MD"
                disabled={true}
                icon={
                  <Image
                    src="/assets/svgs/icons/profile-icon.svg"
                    width={20}
                    height={20}
                    className="mr-2"
                    alt="name"
                  />
                }
              />
            </Form.Item>
            <Form.Item
              className="relative md:col-span-1 col-span-2 mr-3"
              name="email"
            >
              <CustomInput
                labelText=" Email"
                type="email"
                placeholder="xyz@mail.com"
                disabled={true}
                icon={
                  <Image
                    src="/assets/svgs/icons/email-icon.svg"
                    width={20}
                    height={20}
                    className="mr-2"
                    alt="email"
                  />
                }
              />
            </Form.Item>
            <Form.Item
              className="relative md:col-span-1 col-span-2 mr-3"
              name="phone"
            >
              <CustomInput
                labelText="Phone"
                type="text"
                placeholder=""
                disabled={true}
                icon={
                  <Image
                    src="/assets/svgs/icons/phone-icon.svg"
                    width={20}
                    height={20}
                    className="mr-2"
                    alt="phone"
                  />
                }
              />
            </Form.Item>
            <Form.Item
              className="relative md:col-span-1 col-span-2 mr-3"
              name="businessName"
              rules={[
                {
                  required: true,
                  message: "Please input your Business Name!",
                },
              ]}
            >
              <CustomInput
                labelText="Business Name"
                type="text"
                placeholder="11 American Express"
                icon={
                  <Image
                    src="/assets/svgs/icons/city-icon.svg"
                    width={20}
                    height={20}
                    className="mr-2"
                    alt="city"
                  />
                }
              />
            </Form.Item>
            <Form.Item
              className="relative md:col-span-1 col-span-2 mr-3"
              name="businessPhone"
              rules={[
                {
                  required: true,
                  message: "Please input your Business Phone!",
                },
              ]}
            >
              <CustomInput
                labelText="Business Phone #"
                placeholder="678977917"
                icon={
                  <Image
                    src="/assets/svgs/icons/phone-icon.svg"
                    width={20}
                    height={20}
                    className="mr-2"
                    alt="phone"
                  />
                }
              />
            </Form.Item>

            <Form.Item className="relative md:col-span-1 col-span-2 mr-3">
              <label className="block z-[300] opacity-50 font-medium w-full my-1  px-2 text-xs absolute top-[-3px]">
                Business Address
              </label>
              <AutoComplete
                value={businessAddress}
                options={businessOptions}
                onChange={handleBusinessAddressChange}
                onSelect={handleBusinessSelect}
                className="w-full"
              >
                <Input
                  placeholder="Business Address"
                  value={businessAddress}
                  className="w-full px-2 py-1 pt-3 text-gray-800 bg-[#EDE6DE3D] outline-none border border-[#E8E8E8] focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) => setBusinessAddress(e.target.value)}
                  suffix={
                    <Image
                      src={
                        businessAddress
                          ? "/assets/svgs/icons/close-btn.svg"
                          : "/assets/svgs/icons/search-icon.svg"
                      }
                      onClick={() => setBusinessAddress("")}
                      width={20}
                      height={20}
                      alt="search"
                    />
                  }
                />
              </AutoComplete>
            </Form.Item>

            <Form.Item
              name="services"
              className="you-are-select md:col-span-1 col-span-2 mr-3"
            >
              <Select
                size="large"
                mode="multiple"
                labe
                placeholder="Select Services"
                className="w-full text-gray-800 bg-[#EDE6DE3D] outline-none rounded-lg"
                options={[
                  { value: "service1", label: "Service 1" },
                  { value: "service2", label: "Service 2" },
                  { value: "service3", label: "Service 3" },
                  { value: "service4", label: "Service 4" },
                ]}
              />
            </Form.Item>

            <Form.Item
              name="courses"
              className="you-are-select md:col-span-1 col-span-2 mr-3"
            >
              <Select
              disabled
                size="large"
                mode="multiple"
                placeholder="Select Courses"
                className="w-full text-gray-800 bg-[#EDE6DE3D] outline-none rounded-lg"
                options={[
                  { value: "courses1", label: "Courses 1" },
                  { value: "courses2", label: "Courses 2" },
                  { value: "courses3", label: "Courses 3" },
                  { value: "courses4", label: "Courses 4" },
                ]}
              />
            </Form.Item>

            <Form.Item
              className="relative md:col-span-1 col-span-2 mr-3"
              name="instagramAccount"
            >
              <CustomInput
                labelText="Instagram Account"
                type="text"
                placeholder="www.insta.com"
              />
            </Form.Item>

            <Form.Item
              className="relative md:col-span-1 col-span-2 mr-3"
              name="websiteLink"
            >
              <CustomInput
                labelText="website Link"
                type="text"
                placeholder="Website Link"
              />
            </Form.Item>
          </div>
        </Form>
      </div>
    </ProfileLayout>
  );
}
export default Profile;
