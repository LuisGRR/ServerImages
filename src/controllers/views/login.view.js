const usersRepo = require('../../repositories/UserRespository');

exports.viewLogin = async (req, res) => {
  try {
    res.render("auth/login");
  } catch (error) {
    res.status(500).send("error interno del servidor");
  }
}


exports.viewRegister = async (req, res) => {
  try {
    const numUser = await usersRepo.numUsers();
    res.render("auth/register", { numUser: numUser });
  } catch (error) {
    res.status(500).send("error interno del servidor");
  }
};

