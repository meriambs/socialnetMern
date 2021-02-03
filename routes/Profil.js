var express = require('express');
var router = express.Router();
const { sayProfil } = require('../Controllers/profil');
const auth = require ('../middleware/auth');

/* GET home page. */
router.get('/me',auth,sayProfil);

module.exports = router;