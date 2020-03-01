var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test-music-1', function (req, res, next) {
  res.sendFile(path.resolve('./assets/test1.mp3'))
});
router.get('/test-music-2', function (req, res, next) {
  res.sendFile(path.resolve('./assets/test2.mp3'))
});
router.get('/test-music-3', function (req, res, next) {
  res.sendFile(path.resolve('./assets/test3.mp3'))
});

module.exports = router;
