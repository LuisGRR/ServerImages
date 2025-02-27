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