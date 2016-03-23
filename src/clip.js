import dot from 'dot';

let template = dot.template(`

<!DOCTYPE html>
<head>
	<meta content='text/html; charset=UTF-8' http-equiv='Content-Type'/>
	<meta name="twitter:card" content="player">
	<meta name="twitter:site" content="@rchoi">
	<meta name="twitter:title" content="Sample Player Card">
	<meta name="twitter:description" content="This is a sample video. When you implement, make sure all links are secure.">
	<meta name="twitter:image" content="https://yoursite.com/example.png">
	<meta name="twitter:player" content="https://yoursite.com/container.html">
	<meta name="twitter:player:width" content="480">
	<meta name="twitter:player:height" content="480">
	<meta name="twitter:player:stream" content="https://yoursite.com/example.mp4">
	<meta name="twitter:player:stream:content_type" content="video/mp4">
</head>
<html>
<body>

This page has meta tags showcasing the Twitter Player Card with a static MP4 file. The video is courtesy of @TwitterDev via Vine.

<br><br>

When implemented on your own site, please ensure that all links to video are secure (use https).

<br><br>

Lastly, the behavior of video playback is according to the following rules: https://dev.twitter.com/docs/cards/types/player-card

</body>
</html>

`);

export const renderClip = (clipId) => {
    return new Promise((resolve, reject) => {
        resolve(template())
    });
};