const chokidar = require("chokidar");
const path = require("path");
const sharp = require("sharp");

const Image = require("../services/imageService");
const DuplicateImageService = require("../services/duplicateImageService");

const registeredFilenames = new Set(); // Usar un conjunto para almacenar nombres de archivos registrados

// Ruta de la carpeta donde se almacenan las imágenes
const imagesDirectory = path.join(__dirname, "../public/img/uploads");

// Configurar Chokidar para observar la carpeta
const watcher = chokidar.watch(imagesDirectory, {
  persistent: true,
  ignoreInitial: true, // Ignorar eventos iniciales
});

// Evento cuando se agrega un nuevo archivo
watcher.on("add", async (filePath) => {
  const fileName = path.basename(filePath); // Obtener el nombre del archivo

  // Verificar si el archivo ya ha sido registrado
  if (!registeredFilenames.has(fileName)) {
    registeredFilenames.add(fileName); // Agregar el nombre del archivo al conjunto
    try {
      const imageMetadata = await sharp(
        path.join(__dirname, "../public/img/uploads", fileName)
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
      console.log(`Imagen agregada "${fileName}" se registro en la base de datos.`);
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
  console.log(`Imagen eliminada: ${fileName} (${filePath})`);
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
    } else {
      console.log(
        `No se encontró el registro para la imagen eliminada: ${fileName}`
      );
    }
  } catch (err) {
    console.error(`Error al guardar la imagen: ${err.message}`);
  }
});

module.exports = watcher; // Exportar el watcher para usarlo en otros archivos
