
const path = require("path");
require('dotenv').config({ path: `.env.${process.env.NODE_ENV || 'development'}` }); // Cargar el archivo .env correcto


const IMAGE_UPLOADS_PATH =
  process.env.IMAGE_UPLOADS_PATH ||
  path.join(__dirname, "../public/img/uploads");

module.exports = { IMAGE_UPLOADS_PATH };
