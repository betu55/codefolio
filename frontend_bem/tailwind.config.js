/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        btn_h: "2.5rem",
        md_btn_h: "2.6rem",
      },
      colors: {
        brand: {
          light_txt: "#f5f5f5",
          dark_txt: "#323235",
          dark_txt_accent: "#aaa",
          light_bg: "#fefefe",
          dark_bg: "#323235",
          light_accent: "#e8e8e8",
          dark_accent: "#323235",
          mac_bar: "#f3f7fb",
          mac_bar_dark: "#343437",
          border_light: "#555",
          border_dark: "#ccc",
          button_hover: "#777",
          mac_close: "#50bef9",
          mac_minimize: "#85d5fb",
          mac_maximize: "#b8e8fd",
          mac_close_dark: "#50bef9",
          mac_minimize_dark: "#0580b9",
          mac_maximize_dark: "#0a4272",
          linkedin: "#0a66c2",
          github: "#888",
          twitter: "#1DA1F2",
          delete_bg: "#ffc1c1",
          delete_bg_dark: "#775151",
          delete_bg_dark_hover: "#cc6161",
          delete_red: "#e55555",
          accepted: "#99F7AB",
          rejected: "#FF5E5B",
          pending: "#FFD275 ",
        },
      },
      animation: {
        "fade-in": "fadeIn .2s ease-in-out",
        "fade-out": "fadeOut .2s ease-in-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
      },
    },
  },
  plugins: [],
};
