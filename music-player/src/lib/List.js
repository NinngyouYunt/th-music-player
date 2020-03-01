import { Howl, Howler } from "howler";

export default class Player {
  constructor(list) {
    this._list = list;
    this._index = 0;
  }
  /**
   * Play a song or resume play a song
   * @param {Number} index Index of song in the list (optional)
   */
  play(index) {
    console.log("Start Playing");
    index = index ? index : this._index;

    const data = this.getSong(index);
    if (!data._instance) {
      data._instance = new Howl({
        src: [data._source],
        html5: true,
        pool: 0
      });
      console.log("Create Instance");
    }
    data._instance.play();
    this._index = index;
  }

  pause() {
    const instance = this.getSong()._instance;
    if (instance) instance.pause();
  }

  volume(volume) {
    Howler.volume(volume);
  }

  skipTo(index) {
    const instance = this.getSong()._instance;
    if (instance) instance.stop();
    this.play(index);
  }

  skip(forward) {
    let index;
    if (forward) {
      index = this._index + 1;
      if (index > this._list.length) index = 0;
    } else {
      index = this._index - 1;
      if (index < 0) index = this._list.length - 1;
    }
    this.skipTo(index);
  }
  // Getter
  getCurrentSong() {
    return this._currentSong;
  }

  getSong(index) {
    if (!index) index = this._index;
    return this._list[index];
  }
};

export class Song {
  _title;
  _album;
  _source;
  _instance;
};
