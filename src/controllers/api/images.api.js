const Image = require("../../models/image");

exports.images = async (req, res) => {
    try {
        const images = await Image.find();
        res.status(200).json(images);
    } catch (error) {
        res.status(400).json({
            message: "Error al obtner las imagenes ",
        });
    }
};
