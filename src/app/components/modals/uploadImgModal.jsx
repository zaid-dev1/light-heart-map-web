"use client";
import React from "react";
import { Modal } from "antd";
import Image from "next/image";
export function UploadImgModal({ showModal, handleModal }) {
  return (
    <Modal
      title={
        <span className="text-[#746253] text-xl font-light px-8">
          Change your Profile Picture
        </span>
      }
      centered
      open={showModal}
      footer={null}
      className="rounded-full"
      width={650}
      onOk={() => handleModal(false)}
      onCancel={() => handleModal(false)}
      closeIcon={
        <Image
          src="/assets/svgs/icons/close-modal.svg"
          width={16}
          height={16}
          alt="close-icon"
        />
      }
    >
      <div className="grid grid-cols-5 py-4 p-8">
        <div className="col-span-3">
          <div className="flex items-center mt-2">
            <span className="px-8 py-6 bg-primary mr-4 border-2 border-[#F0F0F0] rounded-full text-[#746253]">
              <h3 className="text-4xl font-semibold">A</h3>
            </span>
            <div className="mt-2">
              <div className="flex justify-center items-center border-dashed border rounded-lg border-primary h-[80px] w-[230px]">
                <Image
                  src="/assets/svgs/icons/upload-icon.svg"
                  width={15}
                  height={15}
                  alt="icon"
                />
                <p className="text-[#746253] text-xs ml-2">Upload Photo</p>
              </div>
              <span className="text-[#375B6D] text-[7px]">
                You can upload ‘PNG’ JPEG’. Max size 4MB
              </span>
            </div>
          </div>
          <button className="text-[#746253] text-sm bg-primary rounded-full px-10 py-2 mt-10">
            Upload
          </button>
        </div>
        <div className="col-span-2">
          <Image
            className="ml-8"
            src="/assets/svgs/icons/update-img.svg"
            width={170}
            height={190}
            alt="showcase-img"
          />
        </div>
      </div>
    </Modal>
  );
}
