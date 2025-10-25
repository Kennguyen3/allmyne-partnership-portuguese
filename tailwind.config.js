/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#0a84ff",
          dark: "#075ec0",
          light: "#e6f1ff",
        }
      },
      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'Times', 'serif']
      },
      boxShadow: {
        card: "0 10px 26px rgba(15,23,42,0.08)"
      },
      borderRadius: {
        xl2: "1rem"
      }
    },
  },
  plugins: [],
}
