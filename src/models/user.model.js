const mongoose = require('mongoose');
const {Schema,model} = mongoose;

const userSchema = new Schema({
  name:{
    type:String,
    require: true,
    unique:true,
    minlength:3,
    maxlength:50
  },
  password:{
    type:String,
    require: true,
    minlength:8
  },
  createAt:{
    type:Date,
    default: Date.now
  }
});

module.exports = model("Users",userSchema); 
