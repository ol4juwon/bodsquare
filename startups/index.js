"use strict";

module.exports = (app, express, server) => {
    require('./middleware')(app, express);
    require("./database");
    require('./sockets')(server);
    require('./queue');
    require('../workers/index');

}