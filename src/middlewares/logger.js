const expressWinston = require("express-winston");
const logger = require("../config/logger");

const requestLogger = expressWinston.logger({
  winstonInstance: logger,
  msg: "HTTP {{req.method}} {{req.url}}",
  expressFormat: true,
  colorize: false,
});

module.exports = requestLogger;
