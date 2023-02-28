const Image = require("../models/image");

exports.index = async (req, res) => {
  try {
    const images = await Image.find();
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
    const images = await Image.find();
    res.render("selectResize", { images });
  } catch (error) {
    res.status(500).send("error interno del servidor");
  }
};

exports.imageById = async (req, res) => {
  const { id } = req.params;
  const image = await Image.findById(id);
  res.render("profile", { image });
};

//img manipulation controller
exports.imageEdit = async (req, res) => {
  const { id } = req.params;
  const image = await Image.findById(id);
  res.render("editProfile", { image });
};

exports.imageRezise = async (req, res) => {
  const { id } = req.params;
  const image = await Image.findById(id);
  res.render("resizeImage", { image });
};
