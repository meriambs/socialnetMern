var express = require('express');
var router = express.Router();
const { sayauth } = require('../Controllers/auth');

/* GET home page. */
router.get('/',sayauth);

module.exports = router;