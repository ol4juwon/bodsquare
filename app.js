
require("dotenv").config({});
const createError = require('http-errors');
const http = require('http');
// var bodyParser = require('body-parser');
const debug = require("debug")("app:app");
let express = require('express');
let app = express();
const server = http.createServer(app);
const moment = require("moment");
// let io = require('socket.io');
const socketio = require('socket.io');
const io = socketio(server,
    {
        transport:['polling'],
        cors: {
            cors:{
                origin: "*",
            }}
    }
    )
    io.on('connection', (socket) => {
        console.log('A user is connected');
      
        socket.on('newTask', (message) => {
          console.log(`message from ${socket.id} : ${message}`);
        })
      
        socket.on('disconnect', () => {
          console.log(`socket ${socket.id} disconnected`);
        })
      })
// global.isProduction = process.env.NODE_ENV == "production";
exports =  { io};
require("./app/helper");
// require("./startups/queue");

require("express-async-errors");

require("./startups")(app, express);

app.use((req, res, next) => {
    let requestId = getTimestamp();
    console.log("Time Started", moment().toISOString(true), "headers", req.headers);
    let url = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log("Response",requestId);
    debug(`[${requestId}] Request ${url}`, {
        type: "request-response",
        requestId,
        body: req.body,
        query: req.query,
        params: req.params,
        header: req.headers
    });

    const cleanup = () => {
        res.removeListener('finish', logFn);
        res.removeListener('close', abortFn);
        res.removeListener('error', errorFn)
    };

    const logFn = (a,b,c) => {
        console.log("Response", requestId);
        console.log("Time Ended", moment().toISOString(true));
        cleanup();
        debug( `[${requestId}] Response ${url}`,`${res.statusCode} ${res.statusMessage};`, {
            type: "request-response",
            body: req.body,
            query: req.query,
            params: req.params,
            header: req.headers,
            result: res.success || res.error,
            code: res.statusCode,
            client: res.user
        })
    };

    const abortFn = () => {
        cleanup();
        console.log("Time Ended", moment().toISOString(true));
       debug( `Response ${url}`,`${res.statusCode} ${res.statusMessage}; ${res.get('Content-Length') || 0}b sent || Request aborted by the client`, {
            type: "request-response",
            body: req.body,
            query: req.query,
            params: req.params,
            header: req.headers,
            result: res.success || res.error,
            code: res.statusCode
        });
    };

    const errorFn = err => {
        cleanup();
        console.log("Time Ended Error", moment().toISOString(true));
        debug( `Response ${url}`,`${res.statusCode} ${res.statusMessage}; ${res.get('Content-Length') || 0}b sent || Request pipeline error: ${err}`, {
            type: "request-response",
            body: req.body,
            query: req.query,
            params: req.params,
            header: req.headers,
            result: res.success || res.error,
            code: res.statusCode
        });
    };

    res.on('finish', logFn); // successful pipeline (regardless of its response)
    res.on('close', abortFn); // aborted pipeline
    res.on('error', errorFn); // pipeline internal error
    return next();
});
//routes


// app.use("/", require("./routes/home"));
app.use("/api/v1", require("./routes/v1"));

// catch 404 and forward to error handler
app.use((req, res, next) => {
    return next(createError(404));
});


// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    console.log("error", {err});
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
server.listen(5454, () => console.log('listening on port 3000'))

module.exports = app, server;