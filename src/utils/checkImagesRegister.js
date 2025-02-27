const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const Image = require("../services/imageService");
const DuplicateImageService = require("../services/duplicateImageService");

async function registerUnregisteredImages() {
  try {
    let cantiada = 0;
    const imageFiles = await fs.promises.readdir(
      path.join(__dirname, "../public/img/uploads")
    );
    console.log("Revisando la carpeta de las imagenes alojadas ...");

    const registeredImages = await Image.findImageFileName();

    const registeredFilenames = registeredImages.map((image) => image.filename);

    for (const filename of imageFiles) {
      if (!registeredFilenames.includes(filename)) {
        const imageMetadata = await sharp(
          path.join(__dirname, "../public/img/uploads", filename)
        ).metadata();

        const imageData = {
          title: filename,
          description: "Imagen encontrada al revisar la carpeta",
        };

        const metaData = {
          filename: filename,
          originalname: filename,
          mimetype: "image/" + imageMetadata.format,
          size: imageMetadata.size,
        };

        const imageResult = await Image.saveImage(imageData, metaData);
        DuplicateImageService.saveImage(imageResult);
        cantiada = cantiada + 1;
        console.log(`Imagen "${filename}" registrada en la base de datos.`);
      }
    }
    console.log(`Se agregaron en total  "${cantiada}"`);
  } catch (error) {
    console.error("Error al registrar las imágenes:", error);
  }
}

module.exports = { registerUnregisteredImages };
