const duplicateImageRepository = require("../repositories/duplicateImageRespository");

exports.saveImage = async (imageData) => {
  const validate = await duplicateImageRepository.duplicateImageFindHash(
    imageData.hash
  );

  if (!validate) {
    await duplicateImageRepository.duplicateImageSave({
      imagen_id: imageData._id,
      title: imageData.title,
      hash: imageData.hash,
      path: imageData.path,
    });
  } else {
    await duplicateImageRepository.duplicateImageInsertArray(imageData.hash, {
      imagen_id: imageData._id,
      title: imageData.title,
      path: imageData.path,
    });
  }
};

exports.findImageDuplicate = async () => {
  return await duplicateImageRepository.duplicateImageFind();
};

exports.deleteImageDuplicate = async (id) => {
  try {
    const images = await duplicateImageRepository.duplicateImageFindImagen_id(
      id
    );

    if (images.length > 0) {
      const imageData = images[0];
      if (
        Array.isArray(imageData.images_duplicate) &&
        imageData.images_duplicate.length > 0
      ) {
        const imageDataDuplicateFirst = imageData.images_duplicate[0];

        imageData.title = imageDataDuplicateFirst.title;
        imageData.path = imageDataDuplicateFirst.path;
        imageData.imagen_id = imageDataDuplicateFirst.imagen_id;

        imageData.images_duplicate.shift();

        return await imageData.save();
      }

      return await duplicateImageRepository.duplicateImageDelete(id);
    }

    const imagesArray =
      await duplicateImageRepository.duplicateImageFindImages_duplicateImagen_id(
        id
      );

    if (imagesArray.length > 0) {
      const dataImageArray = imagesArray[0];
      if (
        Array.isArray(dataImageArray.images_duplicate) &&
        dataImageArray.images_duplicate.length > 0
      ) {
         dataImageArray.images_duplicate =
           dataImageArray.images_duplicate.filter((image) => {
             return image.imagen_id.toString() !== id.toString(); // Asegúrate de devolver el resultado de la comparación
           });
        return await dataImageArray.save();
      }
    }

    return null;
  } catch (error) {
    throw new Error("Error al eliminar la imagen duplicada: " + error.message);
  }
};
