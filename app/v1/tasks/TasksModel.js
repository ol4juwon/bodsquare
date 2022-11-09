'use strict';

const mongoose = require('mongoose');
const debug  = require("debug")("app:debug")
let mongoosePaginate = require('mongoose-paginate');

const schema = mongoose.Schema({
    title: {type: String ,index: true},
    description:{type:String},
    time:  {type: String},
    user_id: {type: String},
    status: {type: String}
}, {
    toJSON: {
        transform: (doc, ret) => {
            ret.task_id = ret._id;
            delete ret.__v;
            delete ret._id;
        }
    },
    timestamps: true,
});

schema.post('save', function(task) {
    debug("POST save", task);
});

schema.index({"$**": "text"});
schema.plugin(mongoosePaginate);
module.exports = mongoose.model("tasks", schema);