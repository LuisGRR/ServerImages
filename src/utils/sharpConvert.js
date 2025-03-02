const sharp = require('sharp');
const path = require("path");
//const fs = require('fs');

const { IMAGE_UPLOADS_PATH } = require("../config/config");

const convertImageFormat = async (inputPath, filename, format) => {

    const outputPath = path.join(IMAGE_UPLOADS_PATH, `${filename}.${format}`);
    const image = sharp(inputPath);

    switch (format.toLowerCase()) {
        case 'png':
            await image.png().toFile(outputPath);
            break;
        case 'jpeg':
        case 'jpg':
            await image.jpeg().toFile(outputPath);
            break;
        case 'webp':
            await image.webp().toFile(outputPath);
            break;
        default:
            throw new Error('Unsupported format');
    }

    return outputPath;
};

module.exports = {
    convertImageFormat
};
