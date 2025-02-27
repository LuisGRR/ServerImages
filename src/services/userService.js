const UserRespository = require("../repositories/UserRespository");

exports.findUserName = async (name) => {
  return await UserRespository.UserFindOneByName(name);
}

exports.numberUsers = async () => {
  return await UserRespository.numUsers()
}

exports.saveUser = async (name, password, email) => {
  const saveUser = await UserRespository.SaveUser(name, password, email);
  return saveUser
}

exports.findUser = async (id) =>{
  const userById = await UserRespository.UserFindOneById(id);
  return userById
}


exports.editProfile = async (id, data) => {

  const { name, email } = data.body;
  const updates = {};
  if (name && typeof name !== "string") {
    throw new Error("El nombre debe ser una cadena de texto.");
  }
  if (email && typeof email !== "string") {
    throw new Error("El correo debe ser una cadena de texto.");
  }
  // Verifica si se han proporcionado nuevos valores
  if (name) updates.name = name;
  if (email) updates.email = email;
  if (data.file) updates.avatar = `/img/avatar/${data.file.filename}`; // Solo si se subió un nuevo avatar

  try {
    const updateResult = await UserRespository.ProfileEdit(id, updates);

    if (updateResult.nModified === 0) {
      throw new Error("No se encontró el usuario o no se realizaron cambios");
    }
    return { success: true, message: "Perfil actualizado correctamente" };
  } catch (error) {
    throw new Error(
      "Error en el servicio de actualización de imagen: " + error.message
    );
  }
}