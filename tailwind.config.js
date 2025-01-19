/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        carbon: {
          900: "#18181A",
          800: "#021229",
          700: "#606067",
          400: "#BABABF",
          300: "#D1D1D4",
          200: "#E8E8EA",
          100: "#F8F8F8",
        },
        "customgray-1": "#2A2A2A",
        "customgray-2": "#F5F7FA",
        primary: "#DBCAB8",
        secondary: "#414141",
      },
      backgroundImage: {
        "gradient-custom-1":
          "linear-gradient(326deg, rgba(63, 32, 251, 0.07) 0%, rgba(63, 32, 251, 0.07) 20%, rgba(255, 255, 255, 0.05) 70%, rgba(255, 255, 255, 0.05) 100%)",
        "gradient-custom-2":
          "linear-gradient(120deg, rgba(63, 32, 251, 0.05) 0%, rgba(63, 32, 251, 0.05) 20%, rgba(255, 255, 255, 0.05) 70%, rgba(255, 255, 255, 0.05) 100%)",
        "gradient-custom-3":
          "linear-gradient(180deg, rgba(63, 32, 251, 0.05) 0%, rgba(63, 32, 251, 0.05) 20%, rgba(236, 233, 255, 0.05) 100%)",
        "gradient-custom-4":
          "linear-gradient(0deg, rgba(63, 32, 251, 0.05) 0%, rgba(63, 32, 251, 0.05) 20%, rgba(236, 233, 255, 0.05) 100%)",
        "magic-gradient-1":
          "radial-gradient(99.34% 118.33% at 47.79% 5.00%, #3F20FB 0%, #B377FF 100%)",
        "magic-gradient-2":
          "radial-gradient(85.31% 103.33% at 48.23% 50.00%, #3F20FB 0%, #B377FF 100%)",
      },
      dropShadow: {
        soft: "0 0px 14px rgba(0, 0, 0, 0.10)",
        "glow-1": "0 0px 4px rgba(78, 16, 255, 0.50)",
        "glow-2": "0 0px 12px rgba(78, 16, 255, 0.50)",
      },
      boxShadow: {
        "glow-1": "0 0px 4px rgba(78, 16, 255, 0.50)",
        "glow-2": "0 0px 30px rgba(78, 16, 255, 0.80)",
      },
    },
    top: {
      "1/2": "50%",
    },
  },
  plugins: [],
};
