const expressWinston = require("express-winston");
const logger = require("../config/logger");

const errorLogger = expressWinston.errorLogger({
  winstonInstance: logger, // Usa la instancia de logger existente
  msg: "Error {{err.message}}", // Mensaje de log para errores
  expressFormat: true, // Formato de Express
  colorize: false, // No colorear la salida
});

module.exports = errorLogger;
