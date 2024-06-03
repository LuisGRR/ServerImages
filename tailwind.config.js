/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/*.{html,js,css}', './src/views/**/*.ejs'],
  theme: {
    colors: {
      'primaryColor': "#594545",
      'secondaryColor': "#815B5B",
      'textColor': "#9E7676",
      'detailColor': "#FFF8EA",
      'don-juan': {
        '50': '#f5f2f1',
        '100': '#e5dfdc',
        '200': '#ccc1bc',
        '300': '#af9c95',
        '400': '#977f78',
        '500': '#896e69',
        '600': '#755b59',
        '700': '#594545',
        '800': '#524142',
        '900': '#483b3d',
        '950': '#282022',
      },
    },
  },
  plugins: [
    {
      tailwindcss: {},
      autoprefixer: {},
    },
  ],
};
