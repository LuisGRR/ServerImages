const express = require("express");
const path = require("path");
const morgan = require("morgan");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const { format } = require("timeago.js");
const donenv = require("dotenv");
const session = require('express-session');

const routes = require('./routers/index');


//initial env
const env = process.env.NODE_ENV || 'development';

donenv.config({ path: `.env.${env}` });
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
const storage = multer.diskStorage({
  destination: process.env.IMEGES_FOLDER || path.join(__dirname, "public/img/uploads"),
  filename: (req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave:false,
    saveUninitialized:false
  })
);

app.use(
  multer({
    storage: storage,
  }).single("image")
);

// => Here we expose your dist folder
app.use(express.static(path.join(__dirname, "public")));

//Global Variables
app.use((req, res, next) => {
  app.locals.format = format;
  next();
});

//routers
app.use('/', routes);

//static files
app.use(express.static(path.join(__dirname, "public")));

// Start the server
const server = app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});


module.exports = {server,app}