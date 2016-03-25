'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.renderClipForBots = undefined;

var _dot = require('dot');

var _dot2 = _interopRequireDefault(_dot);

var _lokka = require('lokka');

var _lokkaTransportHttp = require('lokka-transport-http');

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// graphql data deps for this clip
var client = new _lokka.Lokka({
    transport: new _lokkaTransportHttp.Transport(_constants.GRAPHQL_URL)
});

var query = '\n    query getClip($clipId: ID!, $artworkSize: size) {\n        node(id:$clipId) {\n            ... on Clip {\n                id\n                episode {\n                    title\n                    podcast {\n                        artwork(size:$artworkSize)\n                    }\n                }\n                user {\n                    displayName\n                }\n            }\n        }\n    }\n';

var template = function template(clip) {
    var mp3Url = 'https://s3-us-west-1.amazonaws.com/' + _constants.S3_BUCKET + '/' + clip.id + '.mp3';
    return '\n        <!DOCTYPE html>\n        <head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# music: http://ogp.me/ns/music#">\n          <meta content=\'text/html; charset=UTF-8\' http-equiv=\'Content-Type\'/>\n\n          <meta property="fb:app_id"       content="929053407186638" />\n          <meta property="og:type"         content="music.song" />\n          <meta property="og:title"        content="Clip from ' + clip.episode.title + '" />\n          <meta property="og:audio"        content="' + mp3Url + '" />\n          <meta property="og:audio:secure_url" content="' + mp3Url + '">\n          <meta property="og:audio:type"   content="audio/vnd.facebook.bridge" />\n          <meta property="og:image"        content="' + clip.episode.podcast.artwork + '" />\n\n          <meta name="twitter:card" content="player">\n          <meta name="twitter:site" content="@audienceam">\n          <meta name="twitter:title" content="Clip from ' + clip.episode.title + '">\n          <meta name="twitter:description" content="Clipped by ' + clip.user.displayName + ' on Audience">\n          <meta name="twitter:image" content="' + clip.episode.podcast.artwork + '">\n          <meta name="twitter:player" content="https://yoursite.com/container.html">\n          <meta name="twitter:player:width" content="480">\n          <meta name="twitter:player:height" content="480">\n          <meta name="twitter:player:stream" content="https://yoursite.com/example.mp4">\n          <meta name="twitter:player:stream:content_type" content="video/mp4">\n        </head>\n        <html>\n        <body>\n\n        Oh hai, bot.\n\n        </body>\n        </html>\n\n        ';
};

var renderClipForBots = exports.renderClipForBots = function renderClipForBots(clipId) {
    return client.query(query, {
        clipId: clipId,
        artworkSize: 'large'
    }).then(function (res) {
        console.info(res);
        return res.node;
    }).then(function (clip) {
        return template(clip);
    }).catch(function (err) {
        return console.error('error fetching from graphql api: ' + err);
    });
    //return new Promise((resolve, reject) => {
    //    resolve(template())
    //});
};