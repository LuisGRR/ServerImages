const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const { IMAGE_UPLOADS_PATH } = require("../config/config");

const Image = require("../services/imageService");
const DuplicateImageService = require("../services/duplicateImageService");

const checkIntegrityDB = require("./integrityDataBase");

async function registerUnregisteredImages() {
  try {
    let cantiada = 0;
    const imageFiles = await fs.promises.readdir(IMAGE_UPLOADS_PATH);
    console.log("Revisando la carpeta de las imagenes alojadas ...");

    const registeredImages = await Image.findImageFileName();

    const registeredFilenames = registeredImages.map((image) => image.filename);

    const registeredId = registeredImages.map((image) => ({
      filename: image.filename,
      id: image._id, // Asegúrate de que el campo del ID sea correcto
    }));

    for (const filename of imageFiles) {
      if (!registeredFilenames.includes(filename)) {
        const imageMetadata = await sharp(
          path.join(IMAGE_UPLOADS_PATH, filename)
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

    const missingImages = registeredId.filter(
      ({ filename }) => !imageFiles.includes(filename)
    );

    if (missingImages.length > 0) {
      console.log(
        "Los siguientes registros no tienen archivos en la carpeta:",
        missingImages
      );

      // Iterar sobre los registros faltantes y eliminar cada uno
      for (const missingImage of missingImages) {
        const { id } = missingImage;

        // Llamar a las funciones de eliminación
        await Image.deleteRegistImage(id); // Eliminar la imagen
        await DuplicateImageService.deleteImageDuplicate(id); // Eliminar la imagen duplicada
      }
    } else {
      console.log(
        "Todos los registros tienen archivos correspondientes en la carpeta."
      );
    }
    checkIntegrityDB.checkIntegrityDB();
  } catch (error) {
    console.error("Error al registrar las imágenes:", error);
  }
}

module.exports = { registerUnregisteredImages };
