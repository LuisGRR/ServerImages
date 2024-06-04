const Image = require("../../services/imageService");

exports.index = async (req, res) => {
  try {
    const images = await Image.findImage();
    res.render("index", { images });
  } catch (error) {
    res.status(500).send("error interno del servidor");
  }
};

exports.upload = async (req, res) => {
  try {
    res.render("upload");
  } catch (error) {
    res.status(500).send("error interno del servidor");
  }
};

exports.resizes = async (req, res) => {
  try {
    const images = await Image.findImage();
    res.render("selectResize", { images });
  } catch (error) {
    res.status(500).send("error interno del servidor");
  }
};

exports.imageById = async (req, res) => {
  const { id } = req.params;
  const image = await Image.findIdImage(id);
  res.render("profile", { image });
};

//img manipulation controller
exports.imageEdit = async (req, res) => {
  const { id } = req.params;
  const image = await Image.findIdImage(id);
  res.render("editProfile", { image });
};

exports.imageRezise = async (req, res) => {
  const { id } = req.params;
  const image = await Image.findIdImage(id);
  res.render("resizeImage", { image });
};
