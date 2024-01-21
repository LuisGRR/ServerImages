const mongoose = require("mongoose");
const MONGO_URL = process.env.DB_CONNECTION_URL
//Se coloca el puerto de mongo db 27017 para la comunicasion entre el contenedor y se remplaza local host por el nombre del contenedor mongoDB
//
//"mongodb://userMongo:password@mongoDB:27017/serverImages?authSource=admin"
//
//


mongoose.connect(MONGO_URL)
  .then(() => console.log('Base de datos conectada'))
  .catch(e => console.log('error de conexion: ', e));
