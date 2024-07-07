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
        navbutt: "#ff0000",
        navbuttpressed: "#ac8968",
        titletextbackground: "#93785b",
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
