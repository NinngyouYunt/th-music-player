import { Howl, Howler } from "howler";

export default class Player {
  constructor(list) {
    this._list = list;
    this._index = 0;
  }
  bindEvent(onPlay, onSeek, onEnd) {
    this._onPlay = onPlay;
    this._onSeek = onSeek;
    this._onEnd = onEnd;
  }
  /**
   * Play a song or resume play a song
   * @param {Number} index Index of song in the list (optional)
   */
  play(index) {
    index = typeof index === "number" ? index : this._index;
    const data = this.getSong(index);
    if (data) {
      if (!data._instance) {
        this.log(`Loading ${data.source}`);
        data._instance = new Howl({
          src: [data.source],
          html5: true,
          format: ["mp3"],
          pool: 0,
          onplay: () => {
            this._onPlay(data.title, data._duration);
          },
          onload: () => {
            data._duration = data._instance.duration();
          },
          onseek: () => {
            this.log("On Seek");
            this._onSeek();
          },
          onloaderror: () => {
            this.log(`Unable to load resource ${data.source}`);
          },
          onend: () => {
            this._onEnd();
          }
        });
      }
      this.log(`Playing ${data.title} on index ${index}`);
      data._instance.play();
      this._index = index;
    }
  }

  pause() {
    const data = this.getSong();
    if (data && data._instance) data._instance.pause();
  }

  volume(volume) {
    this.log(`Volume set to ${volume}`);
    Howler.volume(volume);
  }

  mute(isMute) {
    this.log(`Mute: ${isMute}`);
    Howler.mute(isMute);
  }

  skipTo(index) {
    const data = this.getSong();
    if (data && data._instance) {
      this.log(`Stop: ${this.getSong().title}`);
      data._instance.stop();
    }
    this.play(index);
  }

  skip(forward) {
    let index;
    if (forward) {
      index = this._index + 1;
      if (index >= this._list.length) index = 0;
    } else {
      index = this._index - 1;
      if (index < 0) index = Math.max(this._list.length - 1, 0);
    }
    this.skipTo(index);
  }
  seek(percent) {
    this.log(`Seek to ${percent}`);
    const data = this.getSong();
    if (data && data._instance) {
      data._instance.seek(percent / 100 * data._duration);
    }
  }
  progress() {
    const data = this.getSong();
    if (data && data._instance) {
      let time = Number(data._instance.seek());
      if (isNaN(time)) {
        time = data._instance._sounds[0]._seek;
      }
      const duration = data._duration;
      return time / duration * 100;
    }
    return 0;
  }
  // Methods to get informaiont
  getSong(index) {
    if (typeof index !== "number") index = this._index;
    return this._list[index];
  }

  isPlaying() {
    const data = this.getSong();
    if (data && data._instance) {
      return data._instance.playing();
    }
    return false;
  }
  duration() {
    const data = this.getSong();
    if (data && data._instance) {
      return data._duration;
    }
    return 0;
  }
  log(msg) {
    console.log(`Player: ${msg}`);
  }
};

export class Song {
  title;
  album;
  source;
  instance;
};
