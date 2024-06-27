const TagsServices = require("../../services/tagService.js");

exports.tags = async (req, res) => {
  try {
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
    
    if (!tags || !Array.isArray(tags)) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "Tags should be an array",
        },
      });
    }

    if(tags.length === 0){
      return res.status(400).json({
        ok: false,
        err: {
          message: "The tag array is empty",
        },
      });
    }
    await TagsServices.tagSave(tags)
    return res.status(200).json({
      ok: true,
      message: "El recurso ha sido guardado exitosamente",
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      err: {
        error: error,
        message: "Error al guardar la informacion"
      }
    });
  }
}
