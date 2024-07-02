/** @type {import('tailwindcss').Config} */
export default {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        bgcolour: "#ac8968",
        titlebackground: "#865d36",
        navbutt: "#ac8968",
        navbuttpressed: "#ac8968",
        titletextbackground: "#93785b",
        titletext: "#ac8968"
      },
      fontFamily: {
        main: ["BonaNovaSC-Regular"],
        bnitalic: ["BonaNovaSC-Italic"],
        headers: ["BonaNovaSC-Bold"],
        body: ["BonaNovaSC-Regular"]
      },
      backgroundImage: {
        "Facebook-Logo": "url('../assets/img/Facebook_Logo_Primary.png')",
      },
      bannerImage: {
        "Banner-Purple": "url('../assets/img/purple-banner.png')",
      },
      animation: {
        "loop-scroll": "loop-scroll 60s linear infinite",
        "loop-scroll2": "loop-scroll 30s linear infinite",
      },
      keyframes: {
        "loop-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
        "loop-scroll2": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
      },
      screens: {
        "2xs": "352px",
        "xs": "449px",
        "md2": "898px",
      },
    },
  },
  plugins: [],
};
