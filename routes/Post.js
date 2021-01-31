var express = require('express');
var router = express.Router();
const { sayPost } = require('../Controllers/post');

/* GET home page. */
router.get('/',sayPost);

module.exports = router;