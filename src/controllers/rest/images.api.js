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
