const UserRespository = require("../repositories/UserRespository");

exports.findUserName = async (name) => {

  return await UserRespository.UserFindOne(name);

}

exports.numberUsers = async () => {
  return await UserRespository.numUsers()
}

exports.saveUser = async (name, password, email) => {

  await UserRespository.SaveUser(name, password, email);

}
