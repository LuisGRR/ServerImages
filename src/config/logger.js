require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

const winston = require("winston");
require("winston-mongodb");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(), // Log en la consola
    new winston.transports.File({ filename: "error.log", level: "error" }), // Log de errores en un archivo
    new winston.transports.MongoDB({
      db: process.env.DB_CONNECTION_URL, // Cambia esto a tu URI de MongoDB
      collection: "logs",
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
  ],
});

module.exports = logger;
