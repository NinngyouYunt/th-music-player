# music-player

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### To-do
- Playlist (display list of song and choose them)
- PlayList category (should be grouped by album)
- Error when load a song failed (should retry or jump to next and produce error)
- Error when load list failed (retry is happending, delay should be configurable, proper message produced, no action should be allowed on player)

### Additional features
- Soundwave for backgroudn
- Display additional information about song
- Collapse/Expand play list

### Bug

### Resolved
- When skip to certain time, the progress bar freeze (inconsistent, reason unknown)
  - When onseek -> step is called, player.isPlaying() is false sometimes
  - Fixed by using this.isPlaying in step
