const TagRepository = require("../repositories/tagsRespository");

exports.tagFind = async () => {
  return await TagRepository.TagsFind();
}

exports.tagSave = async (tags) => {

  if (!Array.isArray(tags)) {
    throw new Error("Tags should be an array");
  }
  try {
    for (let tagName of tags) {
      await TagRepository.TagSave(tagName);
    }

    return { success: true, message: 'El recurso ha sido eliminado exitosamente' };


  } catch (error) {
    throw new Error("Error save tags");

  }
}
