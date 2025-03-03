const fs = require("fs");
const path = require("path");

const { IMAGE_UPLOADS_PATH } = require("../../config/config");
const logger = require("../../config/logger"); // Asegúrate de importar tu logger

const Image = require("../../services/imageService");

//const ImageDuplicate = require("../../services/duplicateImageService");

exports.images = async (req, res) => {
  try {
    const skip = parseInt(req.query.skip) || 0; // Valor por defecto
    const limit = parseInt(req.query.limit) || 10; // Valor por defecto
    
    const images = await Image.findImagePaginateApi(skip, limit);

    const files = images[0].paginatedResults; // Resultados paginados
    const totalCount =
      images[0].totalCount.length > 0 ? images[0].totalCount[0].count : 0;
    const totalPages = Math.ceil(totalCount / limit);

    res.status(200).json({
      totalCount,
      page: Math.floor(skip / limit) + 1, // Número de página actual
      limit, // Número de resultados por página
      hasNextPage: skip + limit < totalCount, // Indica si hay más páginas
      totalPages,
      files,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtner las imagenes ",
    });
  }
};

exports.imageLoad = async (req, res) => {
  try {
    const filename = req.params.filename;
    const imagePath = path.join(IMAGE_UPLOADS_PATH, filename);

    fs.access(imagePath, fs.constants.F_OK, (err) => {
      if (err) {
        logger.error(`Imagen no encontrada: ${filename}`);
        return res.status(404).send("Imagen no encontrada");
      }

      // Configurar encabezados de caché
      res.setHeader("Cache-Control", "public, max-age=31536000"); // 1 año
      res.sendFile(imagePath, (err) => {
        if (err) {
          logger.error(`Error al enviar la imagen: ${err.message}`);
          return res.status(500).json({
            message: "Error al enviar la imagen",
          });
        }
      });
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
