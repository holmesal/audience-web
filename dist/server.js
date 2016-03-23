'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _clip = require('./clip');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_express2.default.static('example'));

app.get('/clip/:clipId', function (req, res) {
    console.info('got clip request!', req.params);
    (0, _clip.renderClip)(req.params.clipId).then(function (clip) {
        return res.end(clip);
    });
});

// Start the server
var APP_PORT = process.env.PORT || 8082; // heroku has dynamic ports
app.listen(APP_PORT, function () {
    console.log('App is now running on http://localhost:' + APP_PORT);
});