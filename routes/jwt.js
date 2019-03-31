const jwt = require('jsonwebtoken');

exports.verifyToken = function (req, res, next) {
    var jwtoken = req.body.token || req.query.token || req.headers.token;
    if (jwtoken) {
        jwt.verify(JSON.parse(jwtoken).token, 'charanApp', function (err, decoded) {
            if (err) {
                console.log('no token');
                return res.status(201).json({ success: false, message: 'No token, Please login again!!', errcode: 'exp-token' });
            } else {
                console.log('token');
                req.decoded = decoded;
                next();
            }
        });
    } else {
        console.log('no token at all');
        res.json([{ message: 'No token' }]);
        // next();
    }
    // next();
}