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
  avatar: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/,
  },
  createAt:{
    type:Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre('save',function(next){
  this.updatedAt = Date.now();
  next(); 
});

module.exports = model("Users",userSchema); 
