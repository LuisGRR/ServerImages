const Image = require("../../models/image");

exports.editImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    Image.updateOne({ _id: id }, { title, description })
      .then(docs => {
        res.status(200).json({
          message: "El recurso ha sido eliminado exitosamente",
        });
      })
      .catch(err => {
        console.log(err);
      });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
