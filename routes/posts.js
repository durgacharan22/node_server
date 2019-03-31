const express = require('express');
const router = express.Router();
const posts = require('../models/posts');
// const jwt = require('../routes/jwt');

const app = express();

// app.use(jwt.verifyToken());

router.get('/posts', function (req, res) {
    // console.log(req.headers.token)
    var username = JSON.parse(req.headers.token).username;
    console.log(username);
    posts.find({ userid: username }, function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            // console.log(doc)
            res.json(doc);
        }
    });
});


// posts.find({})
//     .exec(function (err, posts) {
//         if (err) {
//             console.log(err);
//         } else {
//             res.json(posts);
//         }
//     })

router.get('/postById', function (req, res) {
    console.log(req);

    // posts.find({ "_id":  })
})

router.post('/post', function (req, res) {
    var newpost = new posts();
    newpost.userid = JSON.parse(req.headers.token).username;
    // console.log(req.body);
    newpost.title = req.body.title;
    newpost.comments = [];
    newpost.description = req.body.description;
    console.log(newpost);
    newpost.save(function (err, insertedpost) {
        if (err) {
            console.log('error saving the post' + err);
        } else {
            res.json(insertedpost);
            console.log('inserted')
        };
    });
});



//should send the data from the delete functionality... everything here is working good...
router.delete('/posts/delete/:id', function (req, res) {
    console.log(req.params.id);
    console.log('in delete post')

    posts.findByIdAndRemove(req.params.id, function (err, doc) {
        if (!err) {
            res.json(doc);;
            // res.json(res);
        } else {
            console.log(err);
        }
    })

    // if (req.params.id) {

    //     posts.deleteOne({ _id: req.params.id }, function (err, results) {
    //         if (err) {
    //             console.log('error while deleting' + err)
    //         } else {
    //             res.json({ success: req.params.id })
    //         }
    //     })
    // } else {
    //     console.log('invalid selection to delete');
    // }
})

module.exports = router;