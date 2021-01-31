let express = require('express');
let router = express.Router();

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

var request = require('request');

// GET home page

router.post('/', function (req, res, next) {
    console.log("post " + 'https://coshop.com' + res.locals.routePath);
   request({ url: 'https://coshop.com' + res.locals.routePath, headers: req.headers, body: req.body }, function(err, remoteResponse, remoteBody) {
        if (err) { return res.status(500).end('Error'); }
       // res.writeHead(...); // copy all headers from remoteResponse
        //res.end(remoteBody);
        console.log(err);
        console.log(remoteResponse);
        console.log(remoteBody);
    });
});

router.get('/', function (req, res, next) {
    let options = {
        referrer: "https://coshop.com/"
    };


    JSDOM.fromURL("https://coshop.com"+res.locals.routePath, options).then(dom => {
        let html = dom.serialize();
        html = html.replace(new RegExp('coshop', 'gi'), 'localhost:3000');
        res.send(html);
    });
});

module.exports = router;