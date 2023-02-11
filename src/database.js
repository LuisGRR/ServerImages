const mongoose = require("mongoose");

//Se coloca el puerto de mongo db 27017 para la comunicasion entre el contenedor y se remplaza local host por el nombre del contenedor mongoDB
// mongoose.connect(
//   "mongodb://userMongo:password@mongoDB:27017/serverImages?authSource=admin"
// );

mongoose.connect(
  "mongodb://luis:luis@localhost:27018/serverImages?authSource=admin"
);
