var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'eval',
    entry: [
        //'webpack-dev-server/client?http://localhost',
        //'webpack-dev-server/client?http://localhost',
        'webpack-dev-server/client?http://localhost:8082/',
        //'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr',
        'webpack/hot/dev-server',
        './web/app'
    ],
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'app.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['react-hot', 'babel'],
            include: path.join(__dirname, 'web')
        }]
    }
};