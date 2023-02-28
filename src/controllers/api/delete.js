const Image = require("../../models/image");

const path = require("path");
const { unlink } = require("fs-extra");

exports.deleteImage = async (req, res) => {
  const { id } = req.params;
  const image = await Image.findByIdAndDelete(id);
  await unlink(path.resolve("./src/public" + image.path));
  res.status(200).json({
    message: "El recurso ha sido eliminado exitosamente",
  });
};
