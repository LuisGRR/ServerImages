const Image = require("../../models/image");

const path = require("path");
const { unlink } = require("fs-extra");

exports.deleteImage = async (req, res) => {
  const { id } = req.params;
  try{
    const image = await Image.findByIdAndDelete(id);
    await fs.promises.access(file, fs.constants.F_OK);
    await unlink(path.resolve("./src/public" + image.path));
    res.status(200).json({
      message: "El recurso ha sido eliminado exitosamente",
    });
  }catch(err){
    res.status(400).json({
      message: "El recurso no se ha sido eliminado ",
    });
  }
  
};
