const express = require('express');
const router = express.Router();

const comments = require('../models/comments');
const jwtt = require('../routes/jwt');

const jwt = require('jsonwebtoken');


router.get('/comments', function (req, res) {
    // console.log(req.headers.token)
    var username = JSON.parse(req.headers.token).username;
    console.log(username);
    comments.find({ username: username }, function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            console.log("got comments")
            res.json(doc);
        }
    });
});

router.post('/post/comment', function (req, res) {
    var newcomment = new comments();
    newcomment.postId = req.body.id;
    newcomment.comment = req.body.comment;
    newcomment.username = JSON.parse(req.headers.token).username;
    // console.log(req.body)
    newcomment.save(function (err, insertedpost) {
        if (err) {
            console.log('error saving the post' + err);
        } else {
            res.json(insertedpost);
            console.log('inserted')
        };
    });
});


//     console.log("line 59" + req.body.comment);
//     var arr = [];
//     posts.findById(req.body.id, function (err, doc) {
//         if (doc) {
//             console.log("line 63" + doc.comments);
//             arr.push(req.body.comment);
//             console.log("line 65" + arr);
//             // console.log(doc.comments.push(req.body.comment));

//         } else {
//             console.log(err);
//         }
//     })

//     posts.findOneAndUpdate({ id: req.body.id }, { $set: { comments: arr } }, (err, doc) => {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log("line 77" + doc);
//         }
//     });
// })

module.exports = router;
