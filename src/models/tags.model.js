const { Schema, model } = require("mongoose");
// Modelo de Etiqueta
const TagSchema = new Schema({
  name: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

TagSchema.pre('save', function (next) {
  this.update_at = Date.now();
  next();
});

module.exports = model('Tag', TagSchema);