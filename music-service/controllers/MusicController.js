const path = require("path");
const fs = require("fs");
const createError = require("http-errors");
const MusicDal = require("../dal/MusicDal.js");

class MusicController {
  constructor() {
    this.assetsFolder = "../assets/";
    this._dal = new MusicDal();
  }

  get(req, res, next) {
    const hasMeta = req.query.hasOwnProperty("meta");
    const [albumId, songId] = [req.params["albumId"], req.params["songId"]];
    if (hasMeta) {
      res.send("You asked for meta");
      return;
    } else {
      const filePath = this.createFilePath(albumId, songId);
      if (fs.existsSync(filePath)) {
        console.log(`Sent file ${filePath}`);
        res.setHeader("Content-Type", "audio/mpeg");
        res.sendFile(filePath);
        return;
      }
      next(createError(500, `File ${filePath} not found`))
    }
  }

  list(req, res, next) {
    const dalResult = this._dal.getSongList();
    if (dalResult.success) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(dalResult.data);
      return;
    } else {
      next(createError(500, `Failed to load song list ${dalResult.error}`))
      return;
    }
  }
  //#region Helper
  createFilePath(albumId, songId) {
    albumId = this.prependZero(albumId);
    songId = this.prependZero(songId);
    const folderName = `th${albumId}`;
    const fileName = `${songId}.mp3`;
    return path.join(__dirname, this.assetsFolder, folderName, fileName);
  }
  prependZero(value) {
    if (typeof value == "string") {
      value = Number(value);
    }
    if (value < 10) {
      return `0${value}`;
    }
    return `${value}`;
  }
  //#endregion HELPER
}

module.exports = MusicController;
