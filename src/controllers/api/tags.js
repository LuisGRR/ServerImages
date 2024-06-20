//const TagsRepository = require('../../repositories/tagsRespository');
const TagsServices = require("../../services/tagService.js");

exports.tags = async (req, res) => {
  try {
    //const tags = await TagsRepository.TagsFind();
    const tags = await TagsServices.tagFind();
    return res.status(200).json(tags);
  } catch (error) {
    return res.status(400).json({
      ok: false,
      err: {
        message: "Error al obtner la informacion"
      }
    });
  }
}

exports.tagSave = async (req, res) => {
  try {
    const { tags } = req.body;
    //await TagsRepository.TagSave(tags);
    await TagsServices.tagSave(tags)
    return res.status(200).json({
      message: "El recurso ha sido guardado exitosamente",
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      err: {
        message: "Error al guardar la informacion"
      }
    });
  }
}
