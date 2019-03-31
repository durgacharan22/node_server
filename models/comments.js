const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    username: String,
    postId: String,
    comment: String
});

module.exports = mongoose.model('comments', commentSchema, 'comments');
