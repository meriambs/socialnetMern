var express = require('express');
var router = express.Router();
const { sayProfil } = require('../Controllers/profil');

/* GET home page. */
router.get('/',sayProfil);

module.exports = router;