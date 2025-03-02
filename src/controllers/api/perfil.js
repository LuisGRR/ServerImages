const UserService = require("../../services/userService.js");

exports.updatePrefile = async (req, res) => {
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
