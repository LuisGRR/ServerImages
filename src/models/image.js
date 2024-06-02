const { Schema, model } = require("mongoose");

const imageSchema = new Schema({
  title: { type: String },
  description: { type: String },
  filename: { type: String },
  path: { type: String },
  originalname: { type: String },
  mimetype: { type: String },
  height: { type: String },
  width: { type: String },
  size: { type: Number },
  tags:{
    type:[String],
    default:[]
  },
  created_at: { type: Date, default: Date.now() },
  update_at:{ type: Date, default: Date.now() },
});

imageSchema.pre('save', function (next) {
  this.update_at = Date.now();
  next();
});

module.exports = model("Image", imageSchema);
