module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {},
      fontFamily: {},
      spacing: {
        saib: "var(--saib)",
        sait: "var(--sait)",
        sail: "var(--sail)",
        sair: "var(--sair)",
      },
      zIndex: {
        25: 25,
        35: 35,
        41: 41,
        42: 42,
        43: 43,
        44: 44,
        45: 45,
      },
      transitionProperty: {
        height: "height",
        width: "width",
        visibility: "visibility",
        opacity: "opacity",
        padding: "padding",
      },
      animation: {
        "spin-slow": "spin 2s linear infinite",
      },
    },
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }

      gadget: "240px",
      // => @media (min-width: 240px) { ... }

      mobile: "350px",
      // => @media (min-width: 350px) { ... }

      tablet: "640px",
      // => @media (min-width: 640px) { ... }

      laptop: "1024px",
      // => @media (min-width: 1024px) { ... }

      desktop: "1280px",
      // => @media (min-width: 1280px) { ... }
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/line-clamp"),
  ],
  assetPrefix: "./",
};
