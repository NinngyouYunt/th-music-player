const path = require("path");
const fs = require("fs");
const createError = require("http-errors");

class MusicController {
  constructor() {
    this.folderToFile = "../assets/";
  }
  get(req, res, next) {
    const [albumId, songId] = [req.params["albumId"], req.params["songId"]];
    const filePath = this.createFilePath(albumId, songId);
    if (fs.existsSync(filePath)) {
      console.log(`Sent file ${filePath}`);
      res.sendFile(filePath);
      return;
    }
    next(createError(500, `File ${filePath} not found`))
  }
  createFilePath(albumId, songId) {
    albumId = this.prependZero(albumId);
    songId = this.prependZero(songId);
    const fileName = `th${albumId}_${songId}.mp3`;
    return path.join(__dirname, this.folderToFile, fileName);
  }
  prependZero(number) {
    if (number < 10) {
      return `0${number}`;
    }
    return `${number}`;
  }
}

module.exports = MusicController;
