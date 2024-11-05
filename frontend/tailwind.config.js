const flowbite = require("flowbite-react/tailwind");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        customBlue: "#022b60",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
