const {
  metadataImage,
  reziseImage,
  metadataMimetype,
} = require("../utils/serviceSharp");
const { convertImageFormat } = require("../utils/sharpConvert");
const { getHistogram } = require("../utils/histogramaImages");
const { generateImageHash } = require("../utils/hashImages");

const ImageRespository = require("../repositories/imagesRespository");

const path = require("path");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const { unlink } = require("fs-extra");
const mongoose = require("mongoose");

const { IMAGE_UPLOADS_PATH } = require("../config/config");

exports.findImage = async () => {
  return await ImageRespository.ImageFind();
};

exports.findImage = async () => {
  return await ImageRespository.ImageFind();
};

exports.imageAggregateCreateAt = async () => {
  return await ImageRespository.imageAggregateCreateAt();
};

exports.findIdImage = async (id) => {
  return await ImageRespository.ImageFindId(id);
};

exports.findImageFileName = async () => {
  return await ImageRespository.ImageFindFileName();
};

exports.saveImage = async (imageData, file) => {
  try {
    const imageDetails = {
      title: imageData.title,
      description: imageData.description,
      filename: file.filename,
      path: path.join(IMAGE_UPLOADS_PATH, file.filename),
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
    };

    let tagsImage;
    if (
      imageData.tagsImage === "undefined" ||
      imageData.tagsImage === undefined
    ) {
      tagsImage = undefined;
    } else {
      tagsImage = imageData.tagsImage;
    }

    imageDetails.hash = await generateImageHash(imageDetails.path);
    imageDetails.histogram = await getHistogram(imageDetails.path);

    imageDetails.tags = tagsImage ? JSON.parse(tagsImage) : [];

    const [height, width] = await metadataImage(imageDetails.path);
    imageDetails.height = height;
    imageDetails.width = width;
    console.log(
      `Imagen "${imageDetails.path}" se esta registrando en la base de datos.`
    );
    const image = await ImageRespository.ImageSave(imageDetails);

    return image;
  } catch (error) {
    throw new Error(
      "Error en el servicio al guardar la imagen: " + error.message
    );
  }
};

exports.reziseImage = async (imageData) => {
  const imageInfo = await ImageRespository.ImageFindId(imageData.id);

  const imgName = uuidv4() + path.extname(imageInfo.path);
  //path.join(IMAGE_UPLOADS_PATH, file.filename)
  const imageDetailsRezise = {
    title: imageInfo.title + " - Resize - " + imageData.typeResize,
    description: imageInfo.description,
    filename: imgName,
    path: path.join(IMAGE_UPLOADS_PATH, imgName),
    originalname: imageInfo.filename,
    mimetype: imageInfo.mimetype,
    tags: imageInfo.tags,
  };

  await reziseImage(
    imageData.imgPhat,
    imgName,
    imageData.width,
    imageData.height,
    imageData.typeResize
  );

  imageDetailsRezise.height = imageData.height;
  imageDetailsRezise.width = imageData.width;

  imageDetailsRezise.size = fs.statSync(
    path.join(IMAGE_UPLOADS_PATH, imgName)
  ).size;

  imageDetailsRezise.hash = await generateImageHash(imageDetailsRezise.path);
  imageDetailsRezise.histogram = await getHistogram(imageDetailsRezise.path);

  return await ImageRespository.ImageSave(imageDetailsRezise);
};

exports.convertImage = async (imageData) => {
  try {
    const imageInfo = await ImageRespository.ImageFindId(imageData.id);

    const imgName = uuidv4();

    const imageDetailsRezise = {
      title: imageInfo.title + " - convert - ",
      description: imageInfo.description,
      filename: imgName + "." + imageData.typeConvert,
      originalname: imageInfo.filename,
      tags: imageInfo.tags,
    };

    const outputPath = await convertImageFormat(
      imageData.imgPhat,
      imgName,
      imageData.typeConvert
    );

    imageDetailsRezise.height = imageInfo.height;
    imageDetailsRezise.width = imageInfo.width;
    imageDetailsRezise.path = `${IMAGE_UPLOADS_PATH}/${imgName}.${imageData.typeConvert}`;

    const mimeType = await metadataMimetype(outputPath);

    imageDetailsRezise.mimetype = `image/${mimeType}`;

    imageDetailsRezise.size = fs.statSync(outputPath).size;

    imageDetailsRezise.hash = await generateImageHash(outputPath);
    imageDetailsRezise.histogram = await getHistogram(outputPath);

    return await ImageRespository.ImageSave(imageDetailsRezise);
  } catch (error) {
    throw new Error(
      "Error en el servicio de actualización de imagen: " + error.message
    );
  }
};

/**
 * Servicio para actualizar una imagen
 * @param {string} imageId - El ID de la imagen a actualizar
 * @param {Object} updateData - Los datos a actualizar
 * @returns {Promise<Object>} - La imagen actualizada
 */
exports.editImage = async (id, data) => {
  if (data.title && typeof data.title !== "string") {
    throw new Error("El nombre debe ser una cadena de texto.");
  }
  if (data.description && typeof data.description !== "string") {
    throw new Error("La descripción debe ser una cadena de texto.");
  }
  try {
    const updateResult = await ImageRespository.ImageEdit(id, data);

    if (updateResult.nModified === 0) {
      throw new Error("No se encontró la imagen o no se realizaron cambios");
    }

    return { success: true, message: "Imagen actualizada correctamente" };
  } catch (error) {
    throw new Error(
      "Error en el servicio de actualización de imagen: " + error.message
    );
  }
};

exports.deleteImage = async (id) => {
  console.log("deleteImage called with id:", id); // Log inicial

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("ID de imagen inválido.");
  }
  try {
    const deleteResult = await ImageRespository.ImageDelete(id);

    if (!deleteResult) {
      throw new Error("La imagen no existe.");
    }

    // Verificar si la imagen tiene un path válido
    if (!deleteResult.path) {
      throw new Error("Error al obtener el path de la imagen eliminada.");
    }

    //const filePath = path.resolve("./src/public" + deleteResult.path);

    await fs.promises.access(deleteResult.path, fs.constants.F_OK);
    await unlink(deleteResult.path);

    return {
      success: true,
      message: "El recurso ha sido eliminado exitosamente",
    };
  } catch (err) {
    // Manejar cualquier error que se haya producido durante la verificación o la eliminación del archivo
    let messageError;
    if (err.code === "ENOENT") {
      messageError = `El archivo ${filePath} no existe.`;
    } else if (err.code === "EACCES") {
      messageError = `No tienes permisos para acceder al archivo.`;
    } else {
      messageError = `Se produjo un error al eliminar el archivo: ${err.message}`;
    }

    throw new Error(`El recurso no se ha sido eliminado : ${messageError}`);
  }
};

exports.deleteRegistImage = async (id) => {
  try {
    await ImageRespository.ImageDelete(id);
  } catch (error) {
    throw new Error(
      "Error en el servicio de actualización de imagen: " + error.message
    );
  }
};
