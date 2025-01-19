import Image from "next/image";

export default function Loading() {
  return (
    <main className="h-screen w-screen flex justify-center items-center">
      <Image
        src="/assets/svgs/loading-img.svg"
        width={150}
        height={150}
        alt="loader"
      />
    </main>
  );
}
