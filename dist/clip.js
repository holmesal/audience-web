'use strict';

Object.defineProperty(exports, "__esModule", {
				value: true
});
exports.renderClip = undefined;

var _dot = require('dot');

var _dot2 = _interopRequireDefault(_dot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var template = _dot2.default.template('\n\n<!DOCTYPE html>\n<head>\n\t<meta content=\'text/html; charset=UTF-8\' http-equiv=\'Content-Type\'/>\n\t<meta name="twitter:card" content="player">\n\t<meta name="twitter:site" content="@rchoi">\n\t<meta name="twitter:title" content="Sample Player Card">\n\t<meta name="twitter:description" content="This is a sample video. When you implement, make sure all links are secure.">\n\t<meta name="twitter:image" content="https://yoursite.com/example.png">\n\t<meta name="twitter:player" content="https://yoursite.com/container.html">\n\t<meta name="twitter:player:width" content="480">\n\t<meta name="twitter:player:height" content="480">\n\t<meta name="twitter:player:stream" content="https://yoursite.com/example.mp4">\n\t<meta name="twitter:player:stream:content_type" content="video/mp4">\n</head>\n<html>\n<body>\n\nThis page has meta tags showcasing the Twitter Player Card with a static MP4 file. The video is courtesy of @TwitterDev via Vine.\n\n<br><br>\n\nWhen implemented on your own site, please ensure that all links to video are secure (use https).\n\n<br><br>\n\nLastly, the behavior of video playback is according to the following rules: https://dev.twitter.com/docs/cards/types/player-card\n\n</body>\n</html>\n\n');

var renderClip = exports.renderClip = function renderClip(clipId) {
				return new Promise(function (resolve, reject) {
								resolve(template());
				});
};