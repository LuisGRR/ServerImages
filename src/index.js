require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
}); // Cargar el archivo .env correcto

const express = require("express");
const path = require("path");
const morgan = require("morgan");
const MongoStore = require("connect-mongo");

const { format } = require("timeago.js");
//const donenv = require("dotenv");
const session = require("express-session");

const routes = require("./routers/index");
const checkImagesRegister = require("./utils/checkImagesRegister");

require("./watchers/imageWatcher");

const { IMAGE_UPLOADS_PATH } = require("./config/config");

//initializiones
const app = express();
require("./config/database");

// settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_CONNECTION_URL }),
  })
);

// => Here we expose your dist folder
app.use(express.static(path.join(__dirname, "public")));

//Global Variables
app.use((req, res, next) => {
  app.locals.format = format;
  next();
});

//routers
app.use("/", routes);

//static files
app.use(express.static(path.join(__dirname, "public")));

// Start the server
const server = app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
  console.log(`Carpeta de al macenamiento de imagenes ${IMAGE_UPLOADS_PATH}`);

  checkImagesRegister.registerUnregisteredImages();
});

module.exports = { server, app };
