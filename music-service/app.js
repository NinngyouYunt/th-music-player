const express = require("express");
const logger = require("morgan");
const createError = require('http-errors');

const cfg = require("./config/service.config.js");

// Prepare Controller
const indexRouter = require("./routes/index");
const MusicController = require("./controllers/MusicController.js");

const musicController = new MusicController();

const app = express();

// Set variables
app.set("port", cfg.port);

// Set up middleware
app.use(logger("dev")); // This is console logger
app.use(express.json()); // This is replacement for body-parser
app.use(express.urlencoded({ extended: false }));

// Register router
app.use("/api/", indexRouter);

// Register controller
app.get("/music/album/:albumId/song/:songId", musicController.get.bind(musicController));

// Create a http error for any undefined routes - createError only creates a basic http error object
app.use(function (req, res, next) {
  next(createError(404, "Resource Not Found"));
});

module.exports = app;
