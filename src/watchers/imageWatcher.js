const chokidar = require("chokidar");
const path = require("path");
const sharp = require("sharp");

const { IMAGE_UPLOADS_PATH } = require("../config/config");
const processedFiles = require("../utils/processedFiles");

const Image = require("../services/imageService");
const DuplicateImageService = require("../services/duplicateImageService");

// Ruta de la carpeta donde se almacenan las imágenes
const imagesDirectory = IMAGE_UPLOADS_PATH;

// Configurar Chokidar para observar la carpeta
const watcher = chokidar.watch(imagesDirectory, {
  persistent: true,
  ignoreInitial: true, // Ignorar eventos iniciales
});

// Evento cuando se agrega un nuevo archivo
watcher.on("add", async (filePath) => {
  const fileName = path.basename(filePath); // Obtener el nombre del archivo

  // Verificar si el archivo ya fue procesado por Multer
  if (processedFiles.hasFile(fileName)) {
  /*console.log(
      `El archivo "${fileName}" fue procesado por Multer. Ignorando...`
    );*/
    processedFiles.removeFile(fileName); // Eliminarlo del conjunto después de ignorarlo
    return;
  }

  const registeredImages = await Image.findImageFileName();
  const imageExists = registeredImages.find(
    (image) => image.filename === fileName
  );

  // Verificar si el archivo ya ha sido registrado
  if (!imageExists) {
    // registeredFilenames.add(fileName); // Agregar el nombre del archivo al conjunto
    try {
      const imageMetadata = await sharp(
        path.join(IMAGE_UPLOADS_PATH, fileName)
      ).metadata();

      const imageData = {
        title: fileName,
        description: "Imagen encontrada al revisar la carpeta",
      };

      const metaData = {
        filename: fileName,
        originalname: fileName,
        mimetype: "image/" + imageMetadata.format,
        size: imageMetadata.size,
      };

      const imageResult = await Image.saveImage(imageData, metaData);
      await DuplicateImageService.saveImage(imageResult);
      console.log(
        `Imagen agregada "${fileName}" se registro en la base de datos.`
      );
    } catch (err) {
      if (err.code === 11000) {
        // Código de error para duplicados
        console.log(
          `La imagen "${fileName}" ya está registrada en la base de datos.`
        );
      } else {
        console.error(`Error al guardar la imagen: ${err.message}`);
      }
    }
  } else {
    console.log(
      `La imagen "${fileName}" ya ha sido procesada, no se vuelve a guardar.`
    );
  }
});

// Evento cuando se elimina un archivo
watcher.on("unlink", async (filePath) => {
  const fileName = path.basename(filePath); // Obtener el nombre del archivo
  try {
    // Aquí puedes agregar la lógica para manejar la eliminación de la imagen
    const registeredImages = await Image.findImageFileName();

    // Buscar el registro que coincide con el nombre del archivo eliminado
    const imageToDelete = registeredImages.find(
      (image) => image.filename === fileName
    );

    if (imageToDelete) {
      const { _id: id } = imageToDelete; // Obtener el ID del registro

      // Llamar a las funciones de eliminación
      await Image.deleteRegistImage(id); // Eliminar la imagen
      await DuplicateImageService.deleteImageDuplicate(id); // Eliminar la imagen duplicada

      console.log(`Registro eliminado de la base de datos: ${fileName}`);
    }
  } catch (err) {
    console.error(`Error al guardar la imagen: ${err.message}`);
  }
});

module.exports = watcher; // Exportar el watcher para usarlo en otros archivos
