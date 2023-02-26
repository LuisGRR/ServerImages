const { Router } = require("express");
const path = require("path");
const router = Router();
const { unlink } = require("fs-extra");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const Image = require("../models/image");
const { metadataImage, reziseImage } = require("../services/serviceSharp");

const dirBase = "D:\\Proyectos\\Web\\ServerImages\\src\\";

//views for get

//views for imgs
router.get("/", async (req, res) => {
  const images = await Image.find();
  res.render("index", { images });
});

router.get("/upload", (req, res) => {
  res.render("upload");
});

router.get("/resizes", async (req, res) => {
  const images = await Image.find();
  res.render("selectResize", { images });
});

//img manipulation
router.get("/image/:id", async (req, res) => {
  const { id } = req.params;
  const image = await Image.findById(id);
  res.render("profile", { image });
});

router.get("/image/:id/edit", async (req, res) => {
  const { id } = req.params;
  const image = await Image.findById(id);
  // await image.clone();
  res.render("editProfile", { image });
});

router.get("/image/:id/rezise", async (req, res) => {
  const { id } = req.params;
  const image = await Image.findById(id);
  res.render("resizeImage", { image });
});

//API REST
router.post("/upload", async (req, res) => {
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
    res.redirect("/");
  } catch (err) {
    console.log(`Error al obtener metadata de la imagen: ${err}`);
    res.status(500).send("Error al guardar la imagen en la base de datos.");
  }
});

router.post("/image/rezise", async (req, res) => {
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
    await reziseImage(imgPhat, imgName, width, height);
    await metadataImage(image.path).then(([height, width]) => {
      image.height = height;
      image.width = width;
    });
    image.size = await fs.statSync(
      path.join(dirBase, "public/img/rezise/") + imgName
    ).size;

    await image.save();
    res.status(200).json({
      message: "El recurso ha sido eliminado exitosamente",
    });
  } catch (err) {
    console.log(`Error al redimensionar la imagen: ${err}`);
    res.status(500).send("Error al redimensionar la imagen");
  }
});

router.delete("/image/:id/delete", async (req, res) => {
  const { id } = req.params;
  const image = await Image.findByIdAndDelete(id);
  await unlink(path.resolve("./src/public" + image.path));
  res.status(200).json({
    message: "El recurso ha sido eliminado exitosamente",
  });
});

router.put("/image/:id/edit", async (req, res, next) => {
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
});

module.exports = router;
