var express = require('./node_modules/express');
var router = express.Router();

var datadir = 'staticdata';
//staticfile
router.use(express.static(datadir));

module.exports = router;
