
export const songList = [
  {
    album: "_ungroup",
    list: [
      { _title: "Test.mp3", _album: "unknown", _source: "./test.mp3", _instance: null }
    ]
  }
];

class Player {
  constructor(list) {
    this._list = list;
    this._index = 0;
  }
  /**
   * Play a song or resume play a song
   * @param {Number} index Index of song in the list (optional)
   */
  play(index) {
    index = index ? index : this._index;

    let data = this.getSong(index);
    if (!data._instance) {
      data._instance = new Howl({
        src: [data._source],
        html5: true,
        pool: 0
      });
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
    let instance = this.getSong()._instance;
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

const list = [
  { _title: "Test1.mp3", _album: "unknown", _source: "./test1.mp3", _instance: null },
  { _title: "Test2.mp3", _album: "unknown", _source: "./test2.mp3", _instance: null }
];

export class Song {
  _title;
  _album;
  _source;
  _instance;
};
