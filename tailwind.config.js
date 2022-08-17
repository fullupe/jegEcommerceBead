module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        marquee: 'marquee 25s linear infinite',
       
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      },
     
      width:{
        wn:"400px",
        600:"600px",
        1000:"1000px",
      },
      maxWidth:{
        400:"400px"
      },
      maxHeight:{
        70:"70vh"
      },
      minHeight:{
        60:"60vh"
      }


    },
  },
  plugins: [],
}
