//const UsuarioRepository = require("../../repositories/UserRespository");
const UserService = require("../../services/userService.js")
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
  let body = req.body;

  let usuarioDB = await UserService.findUserName(body.name);

  if (!usuarioDB) {
    return res.status(400).json({
      ok: false,
      err: {
        message: "El Usuario no existe"
      }
    });
  }
  if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
    return res.status(400).json({
      ok: false,
      err: {
        message: "Contraseña incorrecta"
      }
    });
  }

  req.session.userId = usuarioDB._id;
  req.session.name = usuarioDB.name;
  req.session.avatar = usuarioDB.avatar;

  res.status(200).json({
    ok: true,
  });
}

exports.register = async (req, res) => {
  let body = req.body;
  const maxUsers = parseInt(process.env.NUM_USERS_SYS, 10); // Convertir a número

  //let numUsers = await UsuarioRepository.numUsers();
  let numUsers = await UserService.numberUsers();
  if (numUsers >= maxUsers) {
    return res.status(400).json({
      ok: false,
      err: {
        message: "Existen mas ususarios de los configurados"
      }
    });
  }

  //  let user = await UsuarioRepository.SaveUser(body.name, body.password, body.email);
  let user = await UserService.saveUser(body.name, body.password, body.email);
  if (!user) {
    return res.status(500).json({
      ok: false,
      err: {
        message: "Error al crear el usuario"
      }
    });
  }
  req.session.userId = user._id;
  req.session.name = user.name;
  req.session.avatar = user.avatar;

  return res.status(201).json({
    ok: true,
  });
}

exports.logout = async (req, res) => {
  try {
    await new Promise((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
    res.redirect("/");
  } catch (err) {
    //console.error("Error destroying session: ", err);
    res.status(500).json({
      ok: false,
      error: {
        message: "Error al cerrar sesión. Inténtelo de nuevo."
      }
    });
  }
}

/*exports.retrievePassword = (req, res) => {
  let body = req.body;
  UsuarioRepository.UserFindOneUserEmail(body.name, body.email);
}*/
