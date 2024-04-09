/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '1rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
      screens: {
        sm: '100%',    // Small screens (up to 640px wide)
        md: '100%',    // Medium screens (up to 768px wide)
        lg: '100%',  // Large screens (up to 1024px wide)
        xl: '100%',  // Extra large screens (up to 1280px wide)
      },
    },
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"],
  },
}

