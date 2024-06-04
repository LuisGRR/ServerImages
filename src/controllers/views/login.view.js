const usersRepo = require('../../repositories/UserRespository');

exports.viewLogin = async (req, res) => {
  try {
    const numUser = await usersRepo.numUsers();
    res.render("login", { numUser: numUser });
  } catch (error) {
    res.status(500).send("error interno del servidor");
  }
}

