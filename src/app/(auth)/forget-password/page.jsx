"use client";
import React, { useEffect, useState } from "react";
import { Form, message } from "antd";
import CustomInput from "../../components/uiComponents/InputField";
import Btn from "../../components/uiComponents/Btn";
import Image from "next/image";
import Link from "next/link";
import Loading from "../../components/uiComponents/loading";
import { forgetPassword } from "../../api/user";

function ForgetPassword() {
  const [apiLoading, setApiLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  const handleForget = async (values) => {
    try {
      setApiLoading(true);
      const { email } = values;
      const res = await forgetPassword({ email });
      if (res?.message) {
        form.resetFields();
        messageApi.success(res?.message || "Please check your email.");
      } else {
        form.resetFields();
        messageApi.error(error?.response?.data?.message || "Invalid Email");
      }
    } catch (error) {
      form.resetFields();
      messageApi.error(error?.response?.data?.message || "Invalid Email");
    } finally {
      setApiLoading(false);
    }
  };

  if (!isPageLoaded) {
    return <Loading />;
  }

  return (
    <div className="h-screen relative flex flex-col items-center justify-center overflow-y-hidden bg-white lg:grid lg:grid-cols-5 lg:justify-items-center lg:content-center">
      {contextHolder}
      <div className="relative lg:col-span-5 col-span-5 lg:w-[40%] md:w-[60%] w-[80%] flex flex-col justify-center space-y-10 2xl:space-y-12 pt-0 lg:mt-0">
        <div className="space-y-2">
          <h1 className="font-medium text-4xl">Forget Password</h1>
          <p className="text-secondary text-sm mt-2">
            Please Enter your email to recieve an email.{" "}
          </p>
        </div>
        <Form form={form} onFinish={handleForget}>
          <Form.Item
            className="relative"
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <CustomInput
              labelText=" Email"
              type="email"
              placeholder="xyz@mail.com"
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

          <div className="flex justify-end">
            <Link
              href="/login"
              className="text-secondary text-xs hover:text-primary"
            >
              {" "}
              Back to login?
            </Link>
          </div>
          <Form.Item>
            <Btn
              type="submit"
              text={apiLoading ? "Sending Email" : "Send Email"}
              isLoading={apiLoading}
              className="w-[100%] mt-8 bg-primary text-white"
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
export default ForgetPassword;
