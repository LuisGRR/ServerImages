const Image = require("../models/image");

class ImageRespository {

    async ImageFind(){
        try {
            let images = await Image.find();
            return images;
        } catch (err) {
            throw new Error("Error al momento de obtener las images");
        }
    }
    
    async ImageFindId(id){
        try {
            let images = await Image.findById(id);
            return images;
        } catch (err) {
            throw new Error("Error al momento de obtener las images");
        }
    }

    async ImageSave(ImageModel){
        try {
            const imge = new Image(ImageModel);
            await imge.save();
        } catch (error) {
    
        }
    }

}

module.exports = new ImageRespository();