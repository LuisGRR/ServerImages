const { Schema, model } = require("mongoose");

const duplicateImageSchema = new Schema({
  title: { type: String, required: true }, // Nombre original de la imagen
  hash: { type: String, required: true, unique: true }, // Hash de la imagen
  path: { type: String, required: true },
  imagen_id: { type: Schema.Types.ObjectId, ref: "Image", require: true },
  images_duplicate: [
    {
      // Array para almacenar nombres y rutas de imágenes duplicadas
      title: String,
      path: String,
      imagen_id: { type: Schema.Types.ObjectId, ref: "Image", require: true },
    },
  ],
  created_at: { type: Date, default: Date.now }, // Fecha de registro
  update_at: { type: Date, default: Date.now() },
});

duplicateImageSchema.pre("save", function (next) {
  this.update_at = Date.now();
  next();
});

module.exports = model("DuplicateImage", duplicateImageSchema);
