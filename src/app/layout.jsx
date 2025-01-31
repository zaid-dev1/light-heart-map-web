import { Noto_Serif } from "next/font/google";
import "./globals.css";
import { SubLayout } from "./components/subLayout";
import Loading from "./components/uiComponents/loading";
import { Suspense } from "react";

const notoSerif = Noto_Serif({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Light Heart Map",
  description: "Collect & analyze your climate & biodiversity data",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body className={`${notoSerif.className} text-black`}>
        <Suspense fallback={<Loading />}>
          <div className="relative z-0 h-screen w-screen overflow-hidden">
            <SubLayout />
            <div className="bg-[#f7f9f9] h-full w-full min-h-screen overflow-scroll pb-12">
              {children}
            </div>
          </div>
        </Suspense>
      </body>
    </html>
  );
}
