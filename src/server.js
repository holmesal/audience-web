import express from 'express';
import {renderClip} from './clip';
import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackConfig from '../webpack.config';
import history from'connect-history-api-fallback';

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

let twitterCardMiddleware = (req, res, next) => {
    if (req.headers['user-agent'] === 'TwitterBot') {
        //console.info('running twitter card middleware!', req.headers);
        console.info('request came from twitter!');
        renderClip(req.params.clipId).then(clip => res.end(clip));
    } else {
        next();
    }
};

// Hacky - should separate webpac config into dev and production
if (process.env.NODE_ENV === 'production') {
    console.info('serving with static app');
    var app = express();
    app.use('/public', express.static(path.resolve(__dirname, '../public')));
    app.use('/clip/:clipId', twitterCardMiddleware);
    // If the requester is twitter, show them a different page
    //app.get('/clip/:clipId', (req, res) => {
    //    console.info('got clip request!', req.params);
    //    if (req.headers['user-agent'] === 'TwitterBot') {
    //        console.info('twitter is calling!');
    //        renderClip(req.params.clipId).then(clip => res.end(clip));
    //    }
    //});
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

app.use('/clip/:clipId', twitterCardMiddleware);

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
