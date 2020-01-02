var express = require('./node_modules/express');
var router = express.Router();

var fs = require("fs");

var datadir = './data/dummy.json';

router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now());
    next();
})
router.get('/', function (req, res) {
  res.status(200);
  fs.readFile(datadir, function(err,data){
    users = JSON.parse(data);//JSON형태로 text 형태의 파일을 파싱해오는것. readFile은 text형태로 파일을 불러오기에 JSON 형태로 알려준
    console.log(users);
    res.rendor('index', {title: data});
  })
})
module.exports = router;
