/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb", // Blue 600
        secondary: "#e5e7eb", // Gray 200
        danger: "#dc2626", // Red 600
        sidebarBg: "#1f2937", // Gray 800
        navText: "#1f2937", // Gray 800
        pageBg: "#f3f4f6", // Gray 100
        darkBg: "#111827", // Gray 900
        main: "#ffffff",
      },
      margin: {
        "ml-74": "300px",
      },
      width: {
        90: "75%",
      },
      backgroundColor: {
        "light-gray": "#F7F7F7",
      },
    },
  },
  plugins: [],
};
