const sharp = require("sharp");
const path = require("path");

async function metadataImage(image) {
  return new Promise((resolve, reject) => {
    sharp(path.join(path.resolve(__dirname, '..'), "public", image))
      .metadata()
      .then((metadata) => {

        resolve([metadata.height, metadata.width]);
      })
      .catch((err) => {
        console.log(`Error al obtener metadata de la imagen: ${err}`);
        reject(err);
      });
  });
}

async function metadataMimetype(filePath) {
  try {
    const metadata = await sharp(filePath).metadata();
    //console.log(metadata.format);
    return metadata.format;
  } catch (err) {
    console.log(`Error al obtener metadataImageHeight de la imagen: ${err}`);
    return undefined; // o lanza el error si prefieres: throw err;
  }
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

async function reziseImage(pahtImg, filename, width, height, typeResize) {
  return new Promise((resolve, reject) => {
    sharp(path.join(path.resolve(__dirname, '..'), 'public', pahtImg))
      .resize({
        width: parseInt(width),
        height: parseInt(height),
        fit: typeResize
      })
      .toFile(path.join(path.resolve(__dirname, '..'), "public/img/resize/") + filename)
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
  metadataMimetype:metadataMimetype
};
