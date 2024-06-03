const Image = require("../../models/image");

const path = require("path");
const { unlink } = require("fs-extra");
const fs = require("fs"); // Import fs module

exports.deleteImage = async (req, res) => {
  const { id } = req.params;
  try {
    const image = await Image.findByIdAndDelete(id);
    const filePath = path.resolve("./src/public" + image.path);
    console.log("File path: "+filePath)
    await fs.promises.access(filePath, fs.constants.F_OK);
    await unlink(filePath);
    res.status(200).json({
      message: "El recurso ha sido eliminado exitosamente",
    });
  } catch (err) {
    // Manejar cualquier error que se haya producido durante la verificación o la eliminación del archivo
    let messageError;
    if (error.code === 'ENOENT') {
      messageError = `El archivo ${filePath} no existe.`;
    } else if (error.code === 'EACCES') {
      messageError = `No tienes permisos para acceder al archivo ${filePath}.`;
    } else {
      messageError = `Se produjo un error al eliminar el archivo ${filePath}: ${error.message}`;
    }
    console.log(messageError);
    res.status(400).json({
      message: `El recurso no se ha sido eliminado : ${messageError}`,
    });
  }

};
