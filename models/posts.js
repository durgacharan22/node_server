const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    userid: String,
    title: String,
    description: String
});

module.exports = mongoose.model('posts', postSchema, 'posts');
