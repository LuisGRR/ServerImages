const sharp = require('sharp');
const path = require("path");
const fs = require('fs');


const convertImageFormat = async (inputPath, filename, format) => {
    const resolvedInputPath = path.join(path.resolve(__dirname, '..'), 'public', inputPath);

    const outputDir = path.join(path.resolve(__dirname, '..'), 'public/img/convert/');

    /// Ensure the output directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, `${filename}.${format}`);
    const image = sharp(resolvedInputPath);

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

    console.log("convertImageFormat.resolvedInputPath: "+resolvedInputPath);
    console.log("convertImageFormat.outputPath: "+outputPath);


    console.log(`Image converted and saved to ${outputPath}`);
    return outputPath;
};

module.exports = {
    convertImageFormat
};
