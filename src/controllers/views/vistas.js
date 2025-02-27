const Image = require("../../services/imageService");
const User = require("../../services/userService");
const ImageDuplicate = require("../../services/duplicateImageService");

exports.index = async (req, res) => {
  try {
    let avatar = req.session.avatar;

    const images = await Image.findImage();
    res.render("index", { images, avatar });
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

exports.duplicateImages = async (req, res) => {
  try {
    const images = await ImageDuplicate.findImageDuplicate();
    res.render("imagesDuplicate", { images });
  } catch (error) {
    res.status(500).send("error interno del servidor");
  }
};

exports.imageById = async (req, res) => {
  const { id } = req.params;
  const image = await Image.findIdImage(id);
  res.render("profile", { image });
};

exports.imageEdit = async (req, res) => {
  const { id } = req.params;
  const image = await Image.findIdImage(id);
  res.render("editProfile", { image });
};

exports.imageManipulation = async (req, res) => {
  const { id,type } = req.params;
  const image = await Image.findIdImage(id);
  res.render("monipulationImage", { image:image,type:type,mimetype: image.mimetype });
};


exports.perfil = async (req, res) => {
  let user = req.session.name
  let dataUser = await User.findUser(req.session.userId); 
  res.render("perfil", { user, dataUser});
};