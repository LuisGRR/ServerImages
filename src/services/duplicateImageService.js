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
