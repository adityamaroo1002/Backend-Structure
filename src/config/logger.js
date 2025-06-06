const { createLogger, format, transports, log } = require("winston");
const { combine, timestamp, label, printf } = format;

const customFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp}: ${level}: ${message}`;
});

const logger = createLogger({
  format: combine(timestamp({ format: "YYYY-MM-DD HH:MM:SS" }), customFormat),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "combines.log" }),
  ],
});

module.exports = logger;