let db = require("db").get();
let Sneak = require("./Sneak");
let ObjectID = require('mongodb').ObjectID;
let async = require("async");

const ENTITY = "sneak";

class SneakManager {

    static get ENTITY() {
        return ENTITY;
    }

    static init() {
        db.collection(ENTITY).createIndex({alias: 1}, {unique: true});
    }

    static list(query, callback) {
        db.collection(ENTITY).find(query).toArray(function (err, res) {
            if (err) {
                callback(err);
            }
            else {
                async.map(res, function (l, cb) {
                    let sneak = new Sneak(l);
                    cb(null, sneak);
                }, function (err, results) {
                    callback(err, results);
                });
            }
        });
    }

    static info(sneak, callback) {
        if (ObjectID.isValid(sneak.getId())) {
            db.collection(ENTITY).findOne({
                _id: new ObjectID(sneak.getId())
            }, function (err, res) {
                if (err || !res) {
                    callback(new Error("Sneak not found"));
                } else {
                    let sneak = new Sneak(res);
                    callback(null, sneak);
                }
            });
        } else {
            callback(new Error("Invalid sneak's id passed"));
        }
    }

    static get(sneak, callback) {
        db.collection(ENTITY).findOne({alias: sneak.getAlias()}, function (err, res) {
            if (err || !res) {
                callback(new Error("Sneak not found"));
            } else {
                let sneak = new Sneak(res);
                callback(null, sneak);
            }
        });
    }

    static create(sneak, callback) {
        db.collection(ENTITY).insertOne({
            alias: sneak.getAlias()
        }, function (err, res) {
            if (err) {
                callback(err);
            }
            else {
                callback(null, res.insertedId);
            }
        });
    }

    static update(sneak, callback) {
        if (ObjectID.isValid(sneak.getId())) {
            db.collection(ENTITY).findOneAndUpdate({
                _id: new ObjectID(sneak.getId())
            }, {
                $set: {
                    alias: sneak.getAlias()
                }
            }, function (err, res) {
                if (err) {
                    callback(err);
                }
                else {
                    let lid = res.value._id;
                    callback(null, lid);
                }
            });
        } else {
            callback(new Error("Invalid sneak's id passed"));
        }
    }

    static remove(sneak, callback) {
        if (ObjectID.isValid(sneak.getId())) {
            db.collection(ENTITY).deleteOne({
                _id: new ObjectID(sneak.getId())
            }, function (err, res) {
                if (err) {
                    callback(err);
                }
                else {
                    callback(null, res.deletedCount);
                }
            });
        } else {
            callback(new Error("Invalid sneak's id passed"));
        }
    }

}

module.exports = SneakManager;