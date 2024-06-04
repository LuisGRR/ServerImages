const { metadataImage, reziseImage } = require("../utils/serviceSharp");
const ImageRespository = require("../repositories/imagesRespository");

const path = require("path");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

exports.findImage = async () => {
    return await ImageRespository.ImageFind();
}

exports.findIdImage = async (id) => {
    return await ImageRespository.ImageFindId(id);
}

exports.saveImage = async (imageData, file) => {

    const imageDetails = {
        title: imageData.title,
        description: imageData.description,
        filename: file.filename,
        path: `/img/uploads/${file.filename}`,
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size
    };

    let tagsImage;
    if (imageData.tagsImage === 'undefined' || imageData.tagsImage === undefined) {
        tagsImage = undefined;
    } else {
        tagsImage = imageData.tagsImage;
    }
    imageDetails.tags = tagsImage ? JSON.parse(tagsImage) : [];

    const [height, width] = await metadataImage(imageDetails.path);
    imageDetails.height = height;
    imageDetails.width = width;

    ImageRespository.ImageSave(imageDetails);

}

exports.reziseImage = async (imageData) => {
    const dirBase = path.resolve(__dirname, '../');

    const imageInfo = await ImageRespository.ImageFindId(imageData.id);

    const imgName = uuidv4() + path.extname(imageInfo.path);

    const imageDetailsRezise = {
        title: imageInfo.title + "- Resize",
        description: imageInfo.description,
        filename: imgName,
        path: `/img/resize/${imgName}`,
        originalname: imageInfo.filename,
        mimetype: imageInfo.mimetype,
        tags: imageInfo.tags
    }

    const outputDir = path.join(dirBase, "public/img/resize/");

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
      console.log(path.join(outputDir, imgName));
    }

    await reziseImage(imageData.imgPhat, imgName, imageData.width, imageData.height);

    imageDetailsRezise.height = imageData.height;
    imageDetailsRezise.width = imageData.width;

    imageDetailsRezise.size = fs.statSync(path.join(outputDir, imgName)).size;

    ImageRespository.ImageSave(imageDetailsRezise);
}