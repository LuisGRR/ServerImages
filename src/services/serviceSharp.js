const sharp = require("sharp");
const path = require("path");

const dirBase = "D:\\Proyectos\\Web\\ServerImages\\src\\";

function metadataImage(image) {
  return new Promise((resolve, reject) => {
    sharp(path.join(dirBase, "public", image))
      .metadata()
      .then((metadata) => {
        console.log(metadata.height);
        console.log(metadata.width);
        resolve([metadata.height, metadata.width]);
      })
      .catch((err) => {
        console.log(`Error al obtener metadata de la imagen: ${err}`);
        reject(err);
      });
  });
}

function metadataImageHeight(image) {
  sharp(image)
    .metadata()
    .then((metadata) => {
      return metadata.height;
    })
    .catch((err) => {
      console.log(`Error al obtener metadataImageHeight de la imagen: ${err}`);
    });
}

function metadataImageWidth(image) {
  sharp(image)
    .metadata()
    .then((metadata) => {
      return metadata.width;
    })
    .catch((err) => {
      console.log(`Error al obtener metadataImageWidth de la imagen: ${err}`);
    });
}

function reziseImage(pahtImg, filename, width, height) {
  return new Promise((resolve, reject) => {
    sharp(path.join(dirBase, "public", pahtImg))
      .resize({
        width: parseInt(width),
        height: parseInt(height),
      })
      .toFile(path.join(dirBase, "public/img/rezise/") + filename)
      .then((result) => {
        console.log(`Imagen redimensionada correctamente: ${result}`);
        resolve(result);
      })
      .catch((err) => {
        console.log(`Error al redimencionar la imagen: ${err}`);
        reject(err);
      });
  });
}

module.exports = {
  metadataImage: metadataImage,
  metadataImageHeight: metadataImageHeight,
  metadataImageWidth: metadataImageWidth,
  reziseImage: reziseImage,
};
