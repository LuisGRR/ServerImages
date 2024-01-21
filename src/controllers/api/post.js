const path = require("path");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const Image = require("../../models/image");

const { metadataImage, reziseImage } = require("../../services/serviceSharp");

exports.uploadImage = async (req, res) => {
  const image = new Image();
  image.title = req.body.title;
  image.description = req.body.description;
  image.filename = req.file.filename;
  image.path = "/img/uploads/" + req.file.filename;
  image.originalname = req.file.originalname;
  image.mimetype = req.file.mimetype;
  image.size = req.file.size;

  try {
    await metadataImage(image.path).then(([height, width]) => {
       image.height = height;
       image.width = width;
    });
    await image.save();
    res.redirect("/home");
  } catch (err) {
    console.log(`Error al obtener metadata de la imagen: ${err}`);
    res.status(500).send("Error al guardar la imagen en la base de datos.");
  }
};

exports.rezise = async (req, res) => {
  const dirBase = path.resolve(__dirname,'../..');

  const { width, height, imgPhat, id } = req.body;

  const imageInfo = await Image.findById(id);
  const imgName = uuidv4() + path.extname(imageInfo.path);
  const image = new Image();

  image.title = imageInfo.title + "-Reszise";
  image.description = imageInfo.description + "-Reszise";
  image.filename = imgName;
  image.path = "/img/rezise/" + imgName;
  image.originalname = imageInfo.filename;
  image.mimetype = imageInfo.mimetype;
  try {
    fs.mkdir(path.join(path.resolve(__dirname,'../..'), "public/img/rezise/"),{recursive: true},(err)=>{
      if(err) throw err;
    });
    await reziseImage(imgPhat, imgName, width, height);
    //await metadataImage(image.path).then(([height, width]) => {
      image.height = height;
      image.width = width;
    //});
    image.size = fs.statSync(
      path.join(dirBase, "public/img/rezise/") + imgName
    ).size;

    await image.save();
    res.status(200).json({
      message: "El recurso ha sido eliminado exitosamente",
    });
  } catch (err) {
    console.log(`Error al manipular la imagen: ${err}`);
    res.status(500).send("Error al redimensionar la imagen");
  }
};
