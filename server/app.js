var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
// var body_parser = require('body-parser')

var mongoose = require('mongoose');
var mongodb = 'mongodb+srv://[username]:[password]@cluster0.cpnothn.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongodb);
mongoose.Promise = global.Promise;
var db = mongoose.connection;

db.on('error', console.error.bind(console, "MongoDB connection error"));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/userRoutes');
var postsRouter = require('./routes/postRoutes');

var app = express();

var allowedOrigins = ['http://localhost:3000', 'http://localhost:5000'];
app.use(cors({
    credentials: true,
    origin: function (origin, callback) {
        if (!origin) return callback(null, true)
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not allow access from the specified Origin!';
            return callback(new Error(msg), false);
        }
        return callback(null, true)
    }
}));

var session = require('express-session')
const MongoStore = require("connect-mongo");
app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: mongodb})
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);

module.exports = app;
