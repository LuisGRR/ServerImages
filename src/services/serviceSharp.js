const sharp = require("sharp");
const path = require("path");

async function metadataImage(image) {
  return new Promise((resolve, reject) => {
    sharp(path.join(path.resolve(__dirname, '..'), "public", image))
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

async function reziseImage(pahtImg, filename, width, height) {
  return new Promise((resolve, reject) => {
    sharp(path.join(path.resolve(__dirname, '..'), 'public', pahtImg))
      .resize({
        width: parseInt(width),
        height: parseInt(height),
        fit: sharp.fit.fill
      })
      .toFile(path.join(path.resolve(__dirname, '..'), "public/img/rezise/") + filename)
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  })
    .then(message => {
      console.log(message);
    })
    .catch(err => {
      console.log(err)
    });
}

module.exports = {
  metadataImage: metadataImage,
  metadataImageHeight: metadataImageHeight,
  metadataImageWidth: metadataImageWidth,
  reziseImage: reziseImage,
};
