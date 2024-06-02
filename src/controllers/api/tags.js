const TagsRepository = require('../../repositories/RespositoriTags');

exports.tags = async (req, res) => {
  try {
    const tags = await TagsRepository.TagsFind();
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

    if (!Array.isArray(tags)) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "Tags should be an array",
        },
      });
    }
    const savedTags = [];

    for (let tagName of tags) {
      const savedTag = await TagsRepository.TagSave(tagName);
    }

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