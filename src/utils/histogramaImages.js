const sharp = require("sharp");

async function getHistogram(imagePath) {
  const { data, info } = await sharp(imagePath)
    .resize(300, 300) // Redimensionar a un tamaño estándar
    .raw() // Obtener los datos de píxeles sin compresión
    .toBuffer({ resolveWithObject: true });

  const histogram = new Array(256).fill(0); // Inicializar el histograma para 256 niveles de gris

  // Calcular el histograma
  for (let i = 0; i < data.length; i += info.channels) {
    const r = data[i]; // Canal rojo
    const g = data[i + 1]; // Canal verde
    const b = data[i + 2]; // Canal azul

    // Convertir a escala de grises (puedes ajustar la fórmula según sea necesario)
    const gray = Math.round((r + g + b) / 3);
    histogram[gray]++;
  }

  return histogram;
}

function compareHistograms(hist1, hist2) {
  let totalDifference = 0;

  for (let i = 0; i < hist1.length; i++) {
    totalDifference += Math.abs(hist1[i] - hist2[i]);
  }

  // Establecer un umbral para determinar si son similares
  return totalDifference < 1000; // Ajusta este valor según sea necesario
}

module.exports = {
  getHistogram: getHistogram,
  compareHistograms: compareHistograms,
};
