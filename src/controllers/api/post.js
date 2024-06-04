const ImageService = require("../../services/imageService")

exports.uploadImage = async (req, res) => {
  try {
   ImageService.saveImage(req.body, req.file)
    res.redirect("/home");
  } catch (err) {
    console.log(`Error al obtener metadata de la imagen: ${err}`);
    res.status(500).send("Error al guardar la imagen en la base de datos.");
  }
};

exports.rezise = async (req, res) => {
  try {
    ImageService.reziseImage(req.body);
    res.status(200).json({
      message: "El recurso ha sido eliminado exitosamente",
    });
  } catch (err) {
    console.log(`Error al manipular la imagen: ${err}`);
    res.status(500).send("Error al redimensionar la imagen");
  }
};
