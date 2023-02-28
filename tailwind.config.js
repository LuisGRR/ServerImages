/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*.{html,js,css}", "./src/views/**/*.ejs"],
  theme: {
    colors: {
      'primaryColor': "#594545",
      'secondaryColor': "#815B5B",
      'textColor': "#9E7676",
      'detailColor': "#FFF8EA",
    },
  },
  plugins: [
    {
      tailwindcss: {},
      autoprefixer: {},
    },
  ],
};
