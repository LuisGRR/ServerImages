//const { IMAGE_UPLOADS_PATH } = require("../config/config");

const DuplicateImage = require("../models/duplicateImage.model");

const Image = require("../services/imageService");

async function checkIntegrityDB() {
  const images = await Image.findImage();
  const imagesDuplicate = await DuplicateImage.find();

  if (images.length === 0 && imagesDuplicate.length > 0) {
    console.log("No se encontraron datos de imagenes, se limpia bd");
   await DuplicateImage.deleteMany({});
  }
}

module.exports = { checkIntegrityDB };
