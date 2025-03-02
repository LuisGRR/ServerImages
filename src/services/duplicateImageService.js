const duplicateImageRepository = require("../repositories/duplicateImageRespository");

const { compareHistograms } = require("../utils/histogramaImages");

exports.saveImage = async (imageData) => {
  /* const validate = await duplicateImageRepository.duplicateImageFindHash(
    imageData.hash
  );*/

  let validate = false;
  let idImageDuplicada;

  const dataDuplciateImagesHistogram =
    await duplicateImageRepository.duplicateImageFindHistograma();

  for (const data of dataDuplciateImagesHistogram) {
    const similarity = compareHistograms(imageData.histogram, data.histogram);

    if (similarity) {
      console.log(
        `La imagen ${data.filename} es visualmente similar a la nueva imagen.`
      );
      idImageDuplicada = data._id;
      validate = true;
    }
  }

  if (!validate) {
    await duplicateImageRepository.duplicateImageSave({
      imagen_id: imageData._id,
      title: imageData.title,
      hash: imageData.hash,
      histogram: imageData.histogram,
      path: imageData.path,
      filename: imageData.filename,
    });
  } else {
    await duplicateImageRepository.duplicateImageInsertArray(idImageDuplicada, {
      imagen_id: imageData._id,
      title: imageData.title,
      filename: imageData.filename,
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
        imageData.filename = imageDataDuplicateFirst.filename;
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
        await dataImageArray.save();
        
        console.log(dataImageArray.images_duplicate.length);
        // Si el array queda vacío, eliminar el registro completo
        if (dataImageArray.images_duplicate.length === 0) {
          console.log(dataImageArray);
          console.log(dataImageArray.images_duplicate);
          await duplicateImageRepository.duplicateImageDelete(
            dataImageArray.imagen_id
          );
        }

        return dataImageArray;
      }
    }

    return null;
  } catch (error) {
    throw new Error("Error al eliminar la imagen duplicada: " + error.message);
  }
};
