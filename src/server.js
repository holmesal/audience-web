import express from 'express';
import {renderClipForBots} from './clip';
import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackConfig from '../webpack.config';
import history from'connect-history-api-fallback';
import lokka from 'lokka';
import isBot from 'is-bot';

// Options for the html5 history api fallback
const historyFallbackOptions = {
    verbose: false,
    rewrites: [
        // Necessary because this file does not have an extension
        {
            from: '/apple-app-site-association',
            to: '/apple-app-site-association'
        }
    ]
};

let botMiddleware = (req, res, next) => {
    //console.info('got headers: ', req.headers['user-agent']);
    if (isBot(req.headers['user-agent'])) {
        //console.info('running twitter card middleware!', req.headers);
        console.info('request came from a bot!');
        renderClipForBots(req.params.clipId).then(clip => res.end(clip));
    } else {
        next();
    }
};

// Hacky - should separate webpac config into dev and production
if (true || process.env.NODE_ENV === 'production') {
    console.info('serving with static app');
    var app = express();
    // Public is a static directory
    //app.use('/', express.static(path.resolve(__dirname, '../public')));
    // Handle bots requesting clips
    app.use('/clip/:clipId', botMiddleware);
    // History fallback
    app.use(history(historyFallbackOptions));


} else {
    console.info('serving with webpack dev server');
    var app = new WebpackDevServer(webpack(webpackConfig), {
        contentBase: '../public/',
        //proxy: {'/graphql': `http://localhost:${GRAPHQL_PORT}`},
        publicPath: webpackConfig.output.publicPath,
        hot: true,
        historyApiFallback: historyFallbackOptions,
        stats: 'errors-only'
    });
}

//Serve static resources
app.use('/', express.static(path.resolve(__dirname, '../public'), {
    setHeaders: (res, path, stat) => {
        if (path.indexOf('apple-app-site-association') != -1) {
            console.info('serving apple site association file!');
            res.setHeader('Content-Type', 'application/pkcs7-mime');
        }
        return res;
    }
}));

// Start the server
const APP_PORT = process.env.PORT || 8082; // heroku has dynamic ports
app.listen(APP_PORT, () => {
    console.log(`App is now running on http://localhost:${APP_PORT}`);
});
