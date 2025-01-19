import Image from "next/image";

export default function SocialUnit({ icon, value }) {
  return (
    <div className="md:col-span-2 col-span-5 my-4 flex items-center">
      <div className="p-2 rounded-full bg-primary opacity-50">
        <Image
          className="z-[300]"
          src={icon}
          width={15}
          height={15}
          alt="social"
        />
      </div>
      <h3 className=" ml-3 mr-8 text-medium text-xl">{value}</h3>
    </div>
  );
}
