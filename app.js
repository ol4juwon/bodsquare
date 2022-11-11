
require("dotenv").config({});
const createError = require('http-errors');
const http = require('http');
var bodyParser = require('body-parser');
// const path = require('path')
const debug = require("debug")("app:app");
let express = require('express');
let app = express();
const cors = require('cors')
// const moment = require("moment");
require("./app/helper");
require("express-async-errors");
const server = require('http').createServer(app);
require("./startups")(app, express, server);

app.use(express.json());

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}))
app.use("/api/v1", require("./routes/v1"));

// catch 404 and forward to error handler
app.use((req, res, next) => {
    return next(createError(404));
});


// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    console.log("error", err.message);
    debug(err.message, err, {
        request: {
            url: req.url|| {} ,
            body: req.body || {},
            params: req.params || {},
            query: req.query || {}
        }
    });
    // winston.error(err.message, err);
    res.status(err && err.status || 500);
    res.send({error: err && err.message || "An error occurred"});
});

// module.exports = app;
server.listen(5454, () => {
    console.log('listening')
})

module.exports= app;