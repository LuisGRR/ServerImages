const fs = require("fs");
const path = require("path");

const { IMAGE_UPLOADS_PATH } = require("../../config/config");

const Image = require("../../services/imageService");

//const ImageDuplicate = require("../../services/duplicateImageService");

exports.images = async (req, res) => {
  try {
    const images = await Image.findImage();
    res.status(200).json(images);
  } catch (error) {
    res.status(400).json({
      message: "Error al obtner las imagenes ",
    });
  }
};

exports.imageLoad = async (req, res) => {
  try {
    const filename = req.params.filename;
    console.log(filename);
    const imagePath = path.join(IMAGE_UPLOADS_PATH, filename);
    console.log(imagePath);

    fs.access(imagePath, fs.constants.F_OK, (err) => {
      if (err) {
        return res.status(404).send("Imagen no encontrada");
      }

      // Configurar encabezados de caché
      res.setHeader("Cache-Control", "public, max-age=31536000"); // 1 año
      res.sendFile(imagePath);
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al obtner las imagenes ",
    });
  }
};

exports.imagesAggregate = async (req, res) => {
  try {
    const images = await Image.imageAggregateCreateAt();

    const groupedImages = images.reduce((acc, curr) => {
      const year = curr._id.year;
      const month = curr._id.month;

      // Si el año no existe en el acumulador, lo inicializamos
      if (!acc[year]) {
        acc[year] = {};
      }

      // Si el mes no existe en el año, lo inicializamos
      if (!acc[year][month]) {
        acc[year][month] = [];
      }

      // Agregar las imágenes al mes correspondiente
      acc[year][month] = acc[year][month].concat(curr.images);
      return acc;
    }, {});

    res.status(200).json(groupedImages);
  } catch (error) {
    res.status(400).json({
      message: "Error al obtner las imagenes ",
    });
  }
};

exports.imageDuplciate = async (req, res) => {
  const date = 1; //=await ImageDuplicate.deleteImageDuplicate(req.params.id);
  res.status(200).json(date);
};
