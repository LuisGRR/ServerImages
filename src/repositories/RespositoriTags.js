const Tags = require('../models/tags.model');

exports.TagsFind = async () =>{
    try{
        let tags = await Tags.find().select('id name');
        return tags;
    }catch(err){
        throw errr;
    }
}

exports.TagSave = async (name) =>{
   try {
    console.log(name);
     let tag = new Tags({
        name:name,
     });

    const saveTag = await tag.save();
    console.log(saveTag);
   } catch (err) {
    console.log(err)
    throw err;
   }
}

/*exports.TagEdit = async (id,newName) =>{
    try{
        Tags.updateOne({_id:id},{name:newName})
        
    }catch(err){
        throw err;
    }
}*/

