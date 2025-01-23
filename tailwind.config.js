module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeInOut: {
          "0%, 100%": { opacity: "0" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        fadeInOut: "fadeInOut 1s infinite",
      },
      colors: {
        _black: "#101010",
        _red: "#E92A2A",
        _white: "#FAFAFA",
      },
      fontFamily: {
        suisse: ["SuisseIntl", "sans-serif"], // Add your custom font family
      },
    },
  },
  plugins: [],
};
