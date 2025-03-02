//const express = require("express");
const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const {IMAGE_UPLOADS_PATH} = require("../config/config");
const processedFiles = require("../utils/processedFiles");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "avatar") {
      cb(null, path.join(__dirname, "../public/img/avatar"));
    } else {
      cb(null, IMAGE_UPLOADS_PATH);
    }
  },
  filename: (req, file, cb) => {
    const filename = uuidv4() + path.extname(file.originalname);
    processedFiles.addFile(filename);
    cb(null, filename);

  },
});

const upload = multer({ storage: storage });

module.exports = upload;
