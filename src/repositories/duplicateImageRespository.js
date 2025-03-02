const DuplicateImage = require("../models/duplicateImage.model");

exports.duplicateImageFind = async () => {
  try {
    return await DuplicateImage.find({
      "images_duplicate.0": { $exists: true },
    })
      .sort({ created_at: 1 })
      .exec();
  } catch (err) {
    throw new Error("Error al momento de buscar la imagen" + err);
  }
};

exports.duplicateImageFindImagen_id = async (imageId) => {
  try {
    const data = await DuplicateImage.find({
      imagen_id: imageId,
    });
    return data;
  } catch (err) {
    throw new Error("Error al momento de buscar la imagen" + err);
  }
};

exports.duplicateImageFindImages_duplicateImagen_id = async (imageId) => {
  try {
    return await DuplicateImage.find({
      images_duplicate: { $elemMatch: { imagen_id: imageId } },
    });
  } catch (err) {
    throw new Error("Error al momento de buscar la imagen" + err);
  }
};

exports.duplicateImageFindHash = async (hash) => {
  try {
    return await DuplicateImage.findOne({ hash: hash });
  } catch (err) {
    throw new Error("Error al momento de buscar la imagen" + err);
  }
};

exports.duplicateImageFindHistograma = async () => {
  try {
    return await DuplicateImage.find();
  } catch (err) {
    throw new Error("Error al momento de buscar la imagen" + err);
  }
};

exports.duplicateImageSave = async (duplicateImageModel) => {
  try {
    let duplicateImage = new DuplicateImage(duplicateImageModel);

    await duplicateImage.save();
  } catch (err) {
    throw new Error("Error al momento de guardar la imagen" + err);
  }
};

exports.duplicateImageInsertArray = async (id, duplicateImageData) => {
  try {
    let duplicateImage = await DuplicateImage.findById(id);

    duplicateImage.images_duplicate.push(duplicateImageData);

    await duplicateImage.save();
  } catch (err) {
    throw new Error("Error al momento de guardar la imagen" + err);
  }
};

exports.duplicateImageUpdate = async (id, duplicateImageModel) => {
  try {
    data.update_at = Date.now(); // Actualizar el campo update_at
    return await DuplicateImage.updateOne({ _id: id }, duplicateImageModel);
  } catch (err) {
    throw new Error("Error al momento de guardar la imagen" + err);
  }
};

exports.duplicateImageDelete = async (id) => {
  try {
    return await DuplicateImage.deleteOne({ imagen_id: id });
  } catch (err) {
    throw new Error("Error al momento de guardar la imagen" + err);
  }
};
