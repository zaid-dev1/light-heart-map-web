import * as React from "react";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });

export function PageH1({ subtitle, actionButton, children }) {
  return (
    <div className="mb-8 w-full flex justify-between">
      <div>
        <h1 className={`${playfair.className} text-4xl font-bold pb-4`}>
          {children}
        </h1>
        {subtitle && <h2>{subtitle}</h2>}
      </div>
      {actionButton && <div>{actionButton}</div>}
    </div>
  );
}

export function PageH2(title) {
  return (
    <div className="mb-4">
      <h2 className={`${playfair.className} text-2xl font-bold`}>{title}</h2>
    </div>
  );
}
