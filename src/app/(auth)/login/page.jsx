"use client";
import React, { useEffect, useState } from "react";
import { Form, message } from "antd";
import { useRouter } from "next/navigation";
import Btn from "../../components/uiComponents/Btn";
import Image from "next/image";
import Link from "next/link";
import Loading from "../../components/uiComponents/loading";
import { loginUser } from "../../api/user";
import CustomInput from "../../components/uiComponents/InputField";
function Login() {
  const router = useRouter();
  const [apiLoading, setApiLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  const handleLogin = async (values) => {
    try {
      setApiLoading(true);
      const { email, password } = values;
      const res = await loginUser({ email, password });
      if (res?.token) {
        messageApi.success(res?.message);
        localStorage.setItem("token", res?.token);
        const currentUser = res.user;
        if (currentUser) {
          router.push("/");
          localStorage.setItem("currentUser", JSON.stringify(currentUser));
        } else {
          form.resetFields();
        }
      } else {
        form.resetFields();
        messageApi.error(
          error?.response?.data?.message || "Invalid Email or Password",
        );
      }
    } catch (error) {
      form.resetFields();
      messageApi.error(
        error?.response?.data?.message || "Invalid Email or Password",
      );
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
      <div className="relative lg:col-span-3 col-span-5 flex flex-col md:w-[70%] w-[80%] justify-center space-y-10 2xl:space-y-12 pt-0 lg:mt-0">
        <div className="space-y-2">
          <h1 className="font-medium text-4xl">Enter your login details</h1>
          <p className="text-secondary text-sm mt-2">
            Don’t have an account.{" "}
            <Link
              href="/signup"
              className="text-[#746253] text-xs hover:text-primary"
            >
              Register
            </Link>
          </p>
        </div>
        <Form form={form} onFinish={handleLogin}>
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
              href="/forget-password"
              className="text-secondary text-xs hover:text-primary"
            >
              {" "}
              Forget Password?
            </Link>
          </div>
          <Form.Item>
            <Btn
              type="submit"
              text="Login"
              isLoading={apiLoading}
              className="w-[100%] mt-8 bg-primary text-white"
            />
          </Form.Item>
        </Form>
      </div>
      <div className="hidden col-span-2 w-[75%] h-[70%] lg:block w-full h-screen flex justify-center items-center space-y-12">
        <Image
          width={500}
          height={500}
          src="/assets/login-page.svg"
          className="w-full h-full"
          alt="showcase"
        />
      </div>
    </div>
  );
}
export default Login;
