'use strict';

const mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');

const schema = mongoose.Schema({
    email: {type: String ,index: true},
    password:{type:String},
    name:  {type: String},
}, {
    toJSON: {
        transform: (doc, ret) => {
            ret.userId = ret._id;
            delete ret.updatedAt;
            delete ret.password;
            delete ret.__v;
            delete ret._id;
        }
    },
    timestamps: true
});

schema.post('save', function(user) {
    console.log("POST save", user);
});

schema.index({"$**": "text"});
schema.plugin(mongoosePaginate);
module.exports = mongoose.model("users", schema);