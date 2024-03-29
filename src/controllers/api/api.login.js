const UsuarioRepository = require("../../repositories/RepositorieUser");
const bcrypt = require("bcrypt");

exports.login = async (req,res) => {
  let body = req.body;
  let usuarioDB = await UsuarioRepository.UserFindOne(body.name);

  if(!usuarioDB){
    return res.status(400).json({
      ok:false,
      err:{
        message:"Usuario o contraseña incorrecto"
      }
    });
  }
  if(!bcrypt.compareSync(body.password,usuarioDB.password)){
    return res.status(400).json({
      ok:false,
      err:{
        message:"Usuario o contraseña incorrecto"
      }
    });
  }

  req.session.userId = usuarioDB._id;

  res.status(200).json({
      ok:true,
      user:usuarioDB
  });
}

exports.register = async (req,res) => {
  let body = req.body;
  let numUsers = await UsuarioRepository.numUsers();
  if(numUsers > 1){
    return res.status(400).json({
      ok:false,
      err:{
        message:"Ya existen mas ususarios de los configurados"
      }
    });
  }

  let user = await UsuarioRepository.SaveUser(body.name,body.password,body.email);

  req.session.userId = user._id;

  return res.status(200).json({
      ok:true,
      user
  });
}

exports.logout = async (req,res) => {
  req.session.destroy(function(err){
    if(err){
      console.log(err);
    }else{
      res.redirect("/")
    }
  });
}

exports.retrievePassword = (req,res) =>{
  let body =req.body;
  let user = UsuarioRepository.UserFindOneUserEmail(body.name,body.email);

  
}