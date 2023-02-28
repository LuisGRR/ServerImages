const Image = require("../../models/image");

exports.editImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    Image.updateOne({ _id: id }, { title, description }, function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({
          message: "El recurso ha sido eliminado exitosamente",
        });
      }
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
