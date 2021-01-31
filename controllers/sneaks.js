let {Sneak, SneakManager} = require("../app/sneaks");
let tempstor = require("tempstor");

/**
 * CREATE NEW SNEAK
 */
module.exports.create = function (req, res, callback) {
    SneakManager.create(new Sneak(tempstor.get(req, SneakManager.ENTITY)), callback);
};

/**
 * DELETE EXIST SNEAK
 */
module.exports.delete = function (req, res, callback) {
    SneakManager.remove(new Sneak(tempstor.get(req, SneakManager.ENTITY)), callback);
};

/**
 * UPDATE EXIST SNEAK
 */
module.exports.update = function (req, res, callback) {
    SneakManager.update(new Sneak(tempstor.get(req, SneakManager.ENTITY)), callback);
};

/**
 * GET LIST OF EXIST SNEAKS
 */
module.exports.list = function (req, res, callback) {
    SneakManager.list({}, callback);
};

/**
 * GET CERTAIN SNEAK BY ID
 */
module.exports.info = function (req, res, callback) {
    SneakManager.info(new Sneak(tempstor.get(req, SneakManager.ENTITY)), callback);
};

/**
 * GET CERTAIN SNEAK BY URL
 */
module.exports.get = function (req, res, callback) {
    SneakManager.get(new Sneak(tempstor.get(req, SneakManager.ENTITY)), callback);
};