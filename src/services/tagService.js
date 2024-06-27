const TagRepository = require("../repositories/tagsRespository");

exports.tagFind = async () => {
  return await TagRepository.TagsFind();
}

exports.tagSave = async (tags) => {
  try {
    for (let tagName of tags) {
      await TagRepository.TagSave(tagName);
    }
    //return { success: true, message: 'El recurso ha sido eliminado exitosamente' };
  } catch (error) {
    throw new Error("Error save tags: ",error);
  }
}
