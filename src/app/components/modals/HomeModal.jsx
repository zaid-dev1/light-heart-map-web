"use client";
import React, { useState, useEffect } from "react";
import { Checkbox, Form, Modal } from "antd";
import Image from "next/image";
import Btn from "../uiComponents/Btn";
import { Noto_Serif } from "next/font/google";
import {
  InitialCheckboxText,
  ValueToUserTypeMap,
} from "../../../../utils/constants";

const notoSerif = Noto_Serif({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export function HomeModal({ fetchUsers, setRolesArray }) {
  const [isopen, setIsOpen] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);
  const [form] = Form.useForm();
  const [checkboxColors, setCheckboxColors] = useState(InitialCheckboxText);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fromLogin = sessionStorage.getItem('fromLogin');
    
    if (fromLogin === 'true') {
      setIsOpen(true);
      sessionStorage.removeItem('fromLogin');
    }
  }, []);


  const handleSearch = (values) => {
    try {
      setApiLoading(true);

      const selectedUserTypes = Object.entries(ValueToUserTypeMap)
        .filter(([key]) => values[key])
        .map(([, userType]) => userType);
      setRolesArray(selectedUserTypes);
      fetchUsers(undefined, selectedUserTypes);
      setIsOpen(false);
    } catch (err) {
      form.resetFields();
    } finally {
      setApiLoading(false);
    }
  };

  const handleValuesChange = (changedValues, allValues) => {
    setCheckboxColors({
      student: allValues.student ? "#2A2A2A" : "#787777",
      lashArtist: allValues.lashArtist ? "#2A2A2A" : "#787777",
      educator: allValues.educator ? "#2A2A2A" : "#787777",
      partner: allValues.partner ? "#2A2A2A" : "#787777",
      lightHQ: allValues.lightHQ ? "#2A2A2A" : "#787777",
    });
  };

  if (!isClient) {
    return null;
  }

  return (
    <Modal
      title={<></>}
      centered
      open={isopen}
      footer={null}
      className={`${notoSerif.className}`}
      width={1250}
      onOk={() => setIsOpen(false)}
      onCancel={() => setIsOpen(false)}
      closeIcon={
        <span className="p-2 rounded-full border bg-primary relative md:top-[-1.75rem] top-0 md:right-[-1.75rem] right-0 ">
          <Image
            src="/assets/svgs/icons/modal-close.svg"
            width={12}
            height={12}
            alt="close-icon"
          />
        </span>
      }
    >
      <div className="h-[75vh] relative flex flex-col items-center justify-center overflow-y-hidden bg-[#EDE6DE]  lg:grid lg:grid-cols-5 lg:justify-items-center lg:content-center rounded-2xl">
        <div className="relative lg:col-span-3 col-span-5 flex flex-col py-10 md:w-[70%] w-[80%] justify-center space-y-4 lg:mt-0">
          <div className="space-y-2">
            <h1 className="font-medium lg:text-3xl md:text-2xl">
              I’m Searching For:
            </h1>
          </div>

          <Form
            form={form}
            onFinish={handleSearch}
            initialValues={{
              student: true,
              lashArtist: true,
              educator: true,
              partner: true,
              lightHQ: true,
            }}
            onValuesChange={handleValuesChange}
          >
            <Form.Item name="student" className="mb-1" valuePropName="checked">
              <Checkbox>
                <p style={{ color: checkboxColors.student }}>
                  Artists Using Light Heart Products
                </p>
              </Checkbox>
            </Form.Item>

            <Form.Item
              name="lashArtist"
              className="mb-1"
              valuePropName="checked"
            >
              <Checkbox>
                <p style={{ color: checkboxColors.lashArtist }}>
                  Light Heart Certified Artists
                </p>
              </Checkbox>
            </Form.Item>

            <Form.Item name="educator" className="mb-1" valuePropName="checked">
              <Checkbox>
                <p style={{ color: checkboxColors.educator }}>
                  Light Heart Certified Educators
                </p>
              </Checkbox>
            </Form.Item>

            <Form.Item name="partner" className="mb-1" valuePropName="checked">
              <Checkbox>
                <p style={{ color: checkboxColors.partner }}>
                  Retail Locations
                </p>
              </Checkbox>
            </Form.Item>

            <Form.Item name="lightHQ" className="mb-1" valuePropName="checked">
              <Checkbox>
                <p style={{ color: checkboxColors.lightHQ }}>Light Heart HQ</p>
              </Checkbox>
            </Form.Item>

            <Form.Item>
              <Btn
                type="submit"
                color="#746253"
                text="Search"
                isLoading={apiLoading}
                className="w-[90%] text-white bg-[#746253]"
              />
            </Form.Item>
          </Form>
        </div>

        <div className="hidden col-span-2 w-[100%] h-[100%] lg:block relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#EDE6DE] to-transparent w-[40%] h-full z-10"></div>
          <Image
            width={500}
            height={600}
            src="/assets/images/modal.png"
            className="w-full h-full object-cover"
            alt="showcase"
          />
        </div>
      </div>
    </Modal>
  );
}
