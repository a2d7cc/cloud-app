const { Schema, model } = require('mongoose')

const FileSchema = new Schema({
    name: {type: String, required: true},
    type: {type: String, required: true},
    size: {type: Number, default: 0},
    accessLink: {type: String},
    path: {type: String, default: ''},
    parent: {type: Schema.Types.ObjectId, ref: 'File'},
    childs: [{type: Schema.Types.ObjectId, ref: 'File'}],
    user: {type: Schema.Types.ObjectId, ref: 'User'}
})

module.exports = model('File', FileSchema)