const sharp = require("sharp");
const crypto = require("crypto");

//no importa el tamañp y el formato contina generando hash difetentes apesar visualmente iguales
async function generateImageHash(imagePath) {
  const imageBuffer = await sharp(imagePath)
    .resize(300, 300) // Redimensionar a un tamaño estándar
    .jpeg({ quality: 100 }) // Convertir a JPEG con calidad máxima
    .raw() // Obtener los datos de píxeles sin compresión
    .toBuffer({ resolveWithObject: true });

  const hash = crypto.createHash("sha256");
  hash.update(imageBuffer.data); // Actualizar el hash con los datos de píxeles
  return hash.digest("hex"); // Devolver el hash en formato hexadecimal
}

module.exports = {
  generateImageHash: generateImageHash,
};
