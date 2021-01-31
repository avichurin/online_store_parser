let express = require('express');
let router = express.Router();

const {PermissionsManager} = require("permissions");

let tempstor = require("tempstor");

// GET home page
router.get('/', PermissionsManager.check([PermissionsManager.P_READ]), function (req, res, next) {


});

module.exports = router;
