const fs = require("fs");
const path = require("path");

const cfg = require("../config/config.js");
const songListUrl = path.join(__dirname, "../assets/SongList.json");

class MusicDal {
  getSongList() {
    const hasFile = fs.existsSync(songListUrl);
    if (hasFile) {
      const list = JSON.parse(fs.readFileSync(songListUrl));
      const result = processList(list);
      return {
        success: true,
        error: null,
        data: result
      };
    } else {
      return {
        success: false,
        error: "File not found",
        data: null
      };
    }
  }
}


function processList(inputList) {
  let list = [];
  for (let i = 0; i < inputList.length; ++i) {
    const item = inputList[i];
    for (let j = 0; j < item.list.length; ++j) {
      console.log(item);
      const obj = {
        title: item.list[j],
        album: item.name,
        source: `${cfg.protocal}://${cfg.url}:${cfg.port}/music/album/${item.albumId}/song/${j + 1}`
      }
      list.push(obj);
    }
  }
  return list;
}

module.exports = MusicDal;
