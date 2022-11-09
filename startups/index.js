"use strict";

module.exports = (app, express) => {
    require('./middleware')(app, express);
    require("./database");

}