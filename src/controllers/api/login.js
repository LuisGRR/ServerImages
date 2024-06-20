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
        message: "Usuario o contraseña incorrecto"
      }
    });
  }
  if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
    return res.status(400).json({
      ok: false,
      err: {
        message: "Usuario o contraseña incorrecto"
      }
    });
  }

  req.session.userId = usuarioDB._id;

  res.status(200).json({
    ok: true,
    user: usuarioDB
  });
}

exports.register = async (req, res) => {
  let body = req.body;
  //let numUsers = await UsuarioRepository.numUsers();
  let numUsers = await UserService.numberUsers();
  if (numUsers > 1) {
    return res.status(400).json({
      ok: false,
      err: {
        message: "Ya existen mas ususarios de los configurados"
      }
    });
  }

  //  let user = await UsuarioRepository.SaveUser(body.name, body.password, body.email);
  let user = await UserService.saveUser(body.name, body.password, body.email);
  req.session.userId = user._id;

  return res.status(200).json({
    ok: true,
    user
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
