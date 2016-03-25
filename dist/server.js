'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _clip = require('./clip');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevServer = require('webpack-dev-server');

var _webpackDevServer2 = _interopRequireDefault(_webpackDevServer);

var _webpack3 = require('../webpack.config');

var _webpack4 = _interopRequireDefault(_webpack3);

var _connectHistoryApiFallback = require('connect-history-api-fallback');

var _connectHistoryApiFallback2 = _interopRequireDefault(_connectHistoryApiFallback);

var _lokka = require('lokka');

var _lokka2 = _interopRequireDefault(_lokka);

var _isBot = require('is-bot');

var _isBot2 = _interopRequireDefault(_isBot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Options for the html5 history api fallback
var historyFallbackOptions = {
    verbose: false,
    rewrites: [
    // Necessary because this file does not have an extension
    {
        from: '/apple-app-site-association',
        to: '/apple-app-site-association'
    }]
};

var botMiddleware = function botMiddleware(req, res, next) {
    //console.info('got headers: ', req.headers['user-agent']);
    if ((0, _isBot2.default)(req.headers['user-agent'])) {
        //console.info('running twitter card middleware!', req.headers);
        console.info('request came from a bot!');
        (0, _clip.renderClipForBots)(req.params.clipId).then(function (clip) {
            return res.end(clip);
        });
    } else {
        next();
    }
};

// Hacky - should separate webpac config into dev and production
if (process.env.NODE_ENV === 'production') {
    console.info('serving with static app');
    var app = (0, _express2.default)();
    // Public is a static directory
    //app.use('/', express.static(path.resolve(__dirname, '../public')));
    // Handle bots requesting clips
    app.use('/clip/:clipId', botMiddleware);
    // History fallback
    app.use((0, _connectHistoryApiFallback2.default)(historyFallbackOptions));
} else {
    console.info('serving with webpack dev server');
    var app = new _webpackDevServer2.default((0, _webpack2.default)(_webpack4.default), {
        contentBase: '../public/',
        //proxy: {'/graphql': `http://localhost:${GRAPHQL_PORT}`},
        publicPath: _webpack4.default.output.publicPath,
        hot: true,
        historyApiFallback: historyFallbackOptions,
        stats: 'errors-only'
    });
}

//Serve static resources
app.use('/', _express2.default.static(_path2.default.resolve(__dirname, '../public'), {
    setHeaders: function setHeaders(res, path, stat) {
        if (path.indexOf('apple-app-site-association') != -1) {
            console.info('serving apple site association file!');
            res.setHeader('Content-Type', 'application/pkcs7-mime');
        }
        return res;
    }
}));

// Start the server
var APP_PORT = process.env.PORT || 8082; // heroku has dynamic ports
app.listen(APP_PORT, function () {
    console.log('App is now running on http://localhost:' + APP_PORT);
});