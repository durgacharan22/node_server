const mongoose = require('mongoose');

const db = 'mongodb+srv://charan:charan@cluster0-3xng2.mongodb.net/users';
mongoose.Promise = global.Promise;


module.exports = function () {
    mongoose.connect(db, { useNewUrlParser: true }, function (err) {
        if (err) {
            console.log("error: " + err);
        } else {
            console.log('DB connected');
        }
    });
}