"use client";
import React from "react";
import { Input } from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

export default function CustomInput({
  type,
  placeholder,
  onChange,
  icon,
  labelText,
  disabled = false,
  ...props
}) {
  const handleChange = (e) => {
    onChange(e.target.value);
  };
  return (
    <>
      {labelText && (
        <label className="block z-[300] opacity-50 font-medium w-full my-1  px-2 text-xs absolute top-[-3px]">
          {labelText}
        </label>
      )}

      {type !== "password" ? (
        <Input
          {...props}
          suffix={icon}
          size="large"
          onChange={handleChange}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full px-2 py-2 pt-3 text-gray-800 bg-[#EDE6DE3D] outline-none border border-[#E8E8E8] focus:border-indigo-600 shadow-sm rounded-lg"
        />
      ) : (
        <Input.Password
          minLength={4}
          iconRender={(visible) => (
            <div style={{ display: "flex", marginLeft: "6px" }}>
              {" "}
              {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />} {icon}{" "}
            </div>
          )}
          onChange={handleChange}
          type={type}
          size="large"
          placeholder={placeholder}
          className="w-full px-3 py-2 pt-3 text-gray-800 bg-[#EDE6DE3D] outline-none border border-[#E8E8E8] focus:border-indigo-600 shadow-sm rounded-lg"
        />
      )}
    </>
  );
}
