import React from "react";

export default function Btn({ isLoading, text, type, className, color }) {
  return (
    <button
      type={type}
      disabled={isLoading}
      className={`border border-1 rounded-full md:py-3 py-2 mt-4 flex justify-center items-center font-semibold  ${className}`}
    >
      {isLoading ? (
        <svg
          className={`animate-spin h-5 w-5 mr-3`}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 2.21.896 4.21 2.344 5.658l2.657-2.368z"
          ></path>
        </svg>
      ) : (
        ""
      )}
      {text}
    </button>
  );
}
