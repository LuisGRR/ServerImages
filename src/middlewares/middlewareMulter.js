//const express = require("express");
const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file.fieldname);
    if (file.fieldname === "avatar") {
      cb(null, path.join(__dirname, "../public/img/avatar"));
    } else {
      cb(
        null,
        process.env.IMEGES_FOLDER ||
          path.join(__dirname, "../public/img/uploads")
      );
    }
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
