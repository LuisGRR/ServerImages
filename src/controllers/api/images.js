const ImageService = require("../../services/imageService");
const DuplicateImageService = require("../../services/duplicateImageService");

exports.uploadImage = async (req, res) => {
  try {
    const imageData = await ImageService.saveImage(req.body, req.file);
    DuplicateImageService.saveImage(imageData);
    res.redirect("/home");
  } catch (err) {
    //console.log(`Error al obtener metadata de la imagen: ${err}`);
    res.status(500).json({
      ok: false,
      message: "Error al guardar la imagen en la base de datos.",
    });
  }
};

exports.updateImage = async (req, res) => {
  try {
    const result = await ImageService.editImage(req.params.id, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const result = await ImageService.deleteImage(req.params.id);
    await DuplicateImageService.deleteImageDuplicate(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

exports.rezise = async (req, res) => {
  try {
    const imageData = await ImageService.reziseImage(req.body);
    DuplicateImageService.saveImage(imageData);
    res.status(200).json({
      message: "El recurso ha se ha redimensionar exitosamente",
    });
  } catch (err) {
    //console.log(`Error al manipular la imagen: ${err}`);
    res
      .status(500)
      .json({ ok: false, message: "Error al redimensionar la imagen" });
  }
};

exports.convert = async (req, res) => {
  try {
    const imageData = await ImageService.convertImage(req.body);
    DuplicateImageService.saveImage(imageData);

    res.status(200).json({
      message: `El recurso ha sido convertido ${req.body.typeConvert} exitosamente`,
    });
  } catch (err) {
    console.log(`Error al manipular la imagen: ${err}`);
    res
      .status(500)
      .json({ ok: false, message: "Error al redimensionar la imagen" });
  }
};
