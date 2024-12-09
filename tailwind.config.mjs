/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  plugins: [require("daisyui")],
  darkMode: "class",
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#ffc933",
          "primary-content": "#000b15",
          secondary: "#3b82f6",
          "secondary-content": "#ffffff",
          accent: "#34d399",
          "accent-content": "#160200",
          neutral: "#080400",
          "neutral-content": "#c6c5c1",
          "base-100": "#fcfcfc",
          "base-200": "#dbdbdb",
          "base-300": "#bbbbbb",
          "base-content": "#161616",
          info: "#00d5ff",
          "info-content": "#001016",
          success: "#84cc16",
          "success-content": "#000803",
          warning: "#dd3e00",
          "warning-content": "#110100",
          error: "#ff8095",
          "error-content": "#160608",
        },
      },
    ],
  },
  extend: {},
};
