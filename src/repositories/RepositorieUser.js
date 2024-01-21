const Usuario = require("../models/user.model");
const bcrypt = require('bcrypt');
const salt =parseInt(process.env.SALT_NUM);

exports.UserFindOne = async (name) => {
  let userData = await Usuario.findOne({name:name});
  return userData || null;
}

exports.SaveUser = async (name,password) =>{
  let user = new Usuario({
    name:name,
    password:bcrypt.hashSync(password,salt)
  });

  await user.save();

  return user;
}

exports.numUsers = async () =>{
  const userNum = await Usuario.countDocuments({});
  return userNum;
}