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
- Volume 0 (Can be set to zero but volume control does not allow to slide to 0)
  - Fix: Make slidable progress bar to replace 
- Error when load a song failed (should retry or jump to next and produce error)
- Error when load list failed (retry is happending, delay should be configurable, proper message produced, no action should be allowed on player)
- Error Message box (showup and user can choose to close, should be able to stack (has a stack size to be configured))

### Additional features
- Soundwave for backgroudn
- Display additional information about song
- Collapse/Expand play list

### Bug
- When skip to certain time, the progress bar freeze (inconsistent, reason unknown)
