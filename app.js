let express = require('express');
let logger = require('morgan');
let path = require('path');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

const session = require('express-session');

let index = require('./routes/index');

const environment = process.env.NODE_ENV || 'development';

let config = require('./app/config')[environment];


let url = require('url');

let app = express();


app.use(session({
    secret: config.MONGO_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view options', {layout: 'layouts/layout'});
app.set('view engine', 'hbs');

const hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials');

// set global base URL
app.use(function (req, res, next) {
    res.locals.base_url = url.format({
        protocol: req.protocol,
        host: req.get('host')
    });
    res.locals.routePath = req.path;
    next();
});


app.use(logger('dev'));

// define limit for request body
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());

app.use('*', index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    if (req.apireq || req.method !== "GET") {
        let json = {status: "err", message: err.status, err_status: err.message};
        res.json(json);
    } else {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('pages/error');
    }
});

module.exports = app;
