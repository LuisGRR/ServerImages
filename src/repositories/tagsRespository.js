const Tags = require('../models/tags.model');

exports.TagsFind = async () => {
    try {
        let tags = await Tags.find().select('id name');
        return tags;
    } catch (err) {
        throw new Error("Error al momento de obtner la imagen"+err);
    }
}

exports.TagSave = async (name) => {
    try {
        let tag = new Tags({
            name: name,
        });

        await tag.save();
    } catch (err) {
        throw new Error("Error al momento de guardar la imagen"+err);
    }
}

/*exports.TagEdit = async (id,newName) =>{
    try{
        Tags.updateOne({_id:id},{name:newName})
        
    }catch(err){
        throw err;
    }
}*/

