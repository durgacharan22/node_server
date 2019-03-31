const express = require('express');
const router = express.Router();

const users = require('../models/users');
const jwtt = require('../routes/jwt');

var app = express();

const jwt = require('jsonwebtoken');

router.post('/user', function (req, res) {
  console.log('post a user');
  var newuser = new users();
  newuser.username = req.body.username;
  newuser.password = req.body.password;
  newuser.save(function (err, insertedUser) {
    if (err) {
      console.log("error saving user")
    } else {
      res.json(insertedUser);
    };
  });
});

// const verifyToken = function (req, res, next) {
//   console.log(req.body);
//   var token = req.body.token || req.query.token;
//   if (token) {
//     jwt.verify(token, 'charanApp', function (err, decoded) {
//       if (err) {
//         return res.json({ message: 'token expired!! please login again' });
//       } else {
//         req.decoded = decoded;
//         next();
//       }
//     });
//   }
// }


router.post('/login', function (req, res) {
  // console.log(req.body.action.state);

  // if (req.body.action) {
  //   username = req.body.action.state.username;
  //   password = req.body.action.state.password;
  // } else {
  //   username = req.body.username
  //   password = req.body.password
  // }

  users.findOne({ username: req.body.username }, function (err, user) {
    if (user) {
      users.findOne({ password: req.body.password }, function (err, pass) {
        if (pass) {
          //jwt here
          var token = jwt.sign({ 'username': req.body.username }, 'charanApp', {
            expiresIn: '1h'
          });
          // res.token = token;
          // res.username = req.body.username;
          res.json({ token, 'username': req.body.username });
          // res.json(user)
          // console.log(user.username)
        } else {
          console.log('wrong password')
        }
      })
    } else {
      console.log('wrong username')
    }
  })
})

router.use(jwtt.verifyToken);

router.get('/users', function (req, res) {
  console.log("get all users")
  users.find({})
    .exec(function (err, users) {
      if (err) {
        console.log("error getting users" + err);
      } else {
        res.json(users);
      }
    });
});

router.get('/users/:id', function (req, res) {
  console.log("get for a single id")
  users.findById(req.params.id)
    .exec(function (err, user) {
      if (err) {
        console.log("error getting user" + err);
      } else {
        res.json(user);
      };
    });
});

module.exports = router;