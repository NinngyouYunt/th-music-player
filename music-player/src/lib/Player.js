import { Howl, Howler } from "howler";

export default class Player {
  constructor(list) {
    this._list = list;
    this._index = 0;
  }
  bindEvent(onPlay, onSeek) {
    this._onPlay = onPlay;
    this._onSeek = onSeek;
  }
  /**
   * Play a song or resume play a song
   * @param {Number} index Index of song in the list (optional)
   */
  play(index) {
    index = typeof index === "number" ? index : this._index;
    const data = this.getSong(index);
    if (!data._instance) {
      console.log(`Loading ${data.source}`);
      data._instance = new Howl({
        src: [data.source],
        html5: true,
        format: ["mp3"],
        pool: 0,
        onplay: () => {
          this._onPlay(data.title, data._instance.duration());
        },
        onseek: () => {
          this._onSeek();
        }
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
    console.log(`Volume set to ${volume}`);
    Howler.volume(volume);
  }

  mute(isMute) {
    Howler.mute(isMute);
  }

  skipTo(index) {
    const instance = this.getSong()._instance;
    console.log(`Stop: ${this.getSong().title}`);
    if (instance) instance.stop();
    this.play(index);
  }

  skip(forward) {
    let index;
    if (forward) {
      index = this._index + 1;
      if (index >= this._list.length) index = 0;
    } else {
      index = this._index - 1;
      if (index < 0) index = this._list.length - 1;
    }
    console.log(index);
    console.log(this._list);
    this.skipTo(index);
  }
  seek(percent) {
    const instance = this.getSong()._instance;
    if (instance) {
      instance.seek(percent / 100 * instance.duration());
    }
  }
  progress() {
    const instance = this.getSong()._instance;
    if (instance) {
      return (instance.seek() / instance.duration() * 100);
    }
  }
  // Getter
  getCurrentSong() {
    return this._currentSong;
  }

  getSong(index) {
    if (typeof index !== "number") index = this._index;
    return this._list[index];
  }

  isPlaying() {
    const instance = this.getSong()._instance;
    if (instance) {
      return instance.playing();
    }
    return false;
  }
  duration() {
    const instance = this.getSong()._instance;
    if (instance) {
      return instance.duration();
    }
    return 0;
  }
};

export class Song {
  title;
  album;
  source;
  instance;
};
