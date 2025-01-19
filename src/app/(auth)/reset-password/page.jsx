"use client";
import React, { useEffect, useState } from "react";
import { Form, message } from "antd";
import CustomInput from "../../components/uiComponents/InputField";
import { useRouter, useSearchParams } from "next/navigation";
import Btn from "../../components/uiComponents/Btn";
import Image from "next/image";
import Link from "next/link";
import Loading from "../../components/uiComponents/loading";
import { resetPassword } from "../../api/user";

function ResetPassword() {
  const router = useRouter();
  const [apiLoading, setApiLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  const [form] = Form.useForm();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  const handleReset = async (values) => {
    try {
      setApiLoading(true);
      const { password } = values;
      const res = await resetPassword({ newPassword: password, token });
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
          <h1 className="font-medium text-4xl">Reset Password</h1>
          <p className="text-secondary text-sm mt-2">
            Please Enter your your new password.{" "}
          </p>
        </div>
        <Form form={form} onFinish={handleReset}>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <CustomInput
              labelText="Password"
              type="password"
              placeholder="*******"
              icon={
                <Image
                  src="/assets/svgs/icons/lock-icon.svg"
                  width={20}
                  height={20}
                  className="ml-2 mr-2"
                  alt="password"
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
              text={apiLoading ? "Resetting ..." : "Reset Password"}
              isLoading={apiLoading}
              className="w-[100%] mt-8 bg-primary text-white"
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
export default ResetPassword;
