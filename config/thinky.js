require("dotenv").config();

exports.thinky = require("thinky")({
  host: process.env.APP_HOST,
  port: process.env.APP_PORT,
  db: process.env.APP_DB,
});
