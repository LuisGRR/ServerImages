const Image = require("../models/image");

class ImageRespository {
  async ImageFind() {
    try {
      let images = await Image.find().sort({ created_at: 1 }).exec();
      return images;
    } catch (err) {
      throw new Error("Error al momento de obtener las images");
    }
  }
  async ImageFindPaginate(skip, limit) {
    try {
      // let images = await Image.find()
      //   .sort({ created_at: -1 })
      //   .skip(skip)
      //   .limit(limit)
      //   .select("_id title filename created_at")
      //   .exec();
      return await Image.aggregate([
        {
          $facet: {
            paginatedResults: [
              {
                $skip: skip, // Aplicar paginación
              },
              {
                $limit: limit, // Limitar el número de resultados
              },
              {
                $project: {
                  // Seleccionar solo los campos necesarios
                  _id: 1,
                  title: 1,
                  filename: 1,
                  created_at: 1,
                },
              },
            ],
            totalCount: [
              {
                $count: "count", // Contar el total de archivos
              },
            ],
          },
        },
      ]);
      //return images;
    } catch (err) {
      throw new Error("Error al momento de obtener las images");
    }
  }

  async imageAggregateCreateAt() {
    let imagesAgregate = await Image.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$created_at" },
            month: { $month: "$created_at" },
          },
          images: { $push: "$$ROOT" }, // Agrupa las imágenes en un array
        },
      },
      { $sort: { "_id.year": -1, "_id.month": -1 } }, // Ordena por año y mes
    ]);
    return imagesAgregate;
  }

  async ImageFindId(id) {
    try {
      let images = await Image.findById(id);
      return images;
    } catch (err) {
      throw new Error("Error al momento de obtener las images");
    }
  }

  async ImageFindFileName() {
    try {
      let images = await Image.find().select("filename");
      return images;
    } catch (err) {
      throw new Error("Error al momento de obtener las images");
    }
  }

  async ImageSave(ImageModel) {
    try {
      const imge = new Image(ImageModel);
      return await imge.save();
    } catch (error) {}
  }

  /**
   * Actualiza una imagen por su ID
   * @param {string} imageId - El ID de la imagen a actualizar
   * @param {Object} updateData - Los datos a actualizar
   * @returns {Promise<Object>} - La imagen actualizada
   */
  async ImageEdit(id, data) {
    data.update_at = Date.now(); // Actualizar el campo update_at
    return await Image.updateOne({ _id: id }, data);
  }

  async ImageDelete(id) {
    return await Image.findByIdAndDelete(id);
  }
}

module.exports = new ImageRespository();
