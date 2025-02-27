const UserService = require("../../services/userService.js");

exports.updatePrefile = async (req, res) => {
  console.log(req.body); // Verifica los campos de texto
  console.log(req.file); // Verifica el archivo subido
  try {
    await UserService.editProfile(req.params.id, req);
    res.redirect("/home");
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Error al modificar la informacion del perfil.",
    });
  }
};
