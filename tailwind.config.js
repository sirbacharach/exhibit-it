/** @type {import('tailwindcss').Config} */
export default {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        bgcolour: "#8c6b4d",
        titlebackground: "#5d3f1f",
        navbutt: "#ff0000",
        navbuttpressed: "#ac8968",
        titletextbackground: "#6b5239",
        titletext: "#ff0000"
      },
      fontFamily: {
        main: ["BonaNovaSC-Regular"],
        bnitalic: ["BonaNovaSC-Italic"],
        headers: ["BonaNovaSC-Bold"],
        body: ["BonaNovaSC-Regular"]
      },
      screens: {
        "2xs": "352px",
        "xs": "449px",
        "md2": "898px",
      },
      backgroundImage: {
        'easel-background': "url('./assets/img/easelBG.png')",
      }
    },
  },
  plugins: [],
};
