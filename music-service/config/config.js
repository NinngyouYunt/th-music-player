require("dotenv").config()

module.exports = cfg = {
  port: process.env.PORT || 4000,
  env: process.env.NODE_ENV || "development",
  url: "localhost",
  protocal: "http"
}
