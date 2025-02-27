/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/*.{html,js,css}', './src/views/**/*.ejs'],
  theme: [
    {
      mytheme: {    
        "primary": "#594545",            
        "secondary": "#815B5B",          
        "accent": "#9E7676",        
        "neutral": "#FFF8EA",
        "base-100": "#ffffff",      
        "info": "#977F78",
        "success": "#E5DFDC",
        "warning": "#594545",
        "error": "#282022",
      },
    }
  ],
  plugins: [
        // eslint-disable-next-line node/no-unpublished-require
    require("@tailwindcss/typography"),
        // eslint-disable-next-line node/no-unpublished-require
    require('daisyui'),
    {
      tailwindcss: {},
      autoprefixer: {},
    },
  ],
  daisyui: {
    themes: ["light", "dark", "cupcake"], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "dark", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
};
