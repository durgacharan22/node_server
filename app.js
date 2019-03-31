const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
// const path = require('path');
const users = require('./routes/users');
const posts = require('./routes/posts');
const comments = require('./routes/comments');
require('./db/db')();
// app.use(db);
app.use(cors());
// const router = express.Router();

// app.use(express.static(path.join(__dirname, 'src')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', users);
app.use('/api', posts);
app.use('/api', comments);

app.get("/", function (req, res) {
  res.send("Welcome to my application");
});

// app.get('/users', function (req, res) {
//   res.sendFile('http://localhost:3000/users');
// });

app.listen(3000, function () {
  console.log("server running on localhost:3000");
});
