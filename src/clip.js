import dot from 'dot';
import { Lokka } from 'lokka';
import { Transport } from 'lokka-transport-http';
import { S3_BUCKET, GRAPHQL_URL } from './constants';

// graphql data deps for this clip
const client = new Lokka({
    transport: new Transport(GRAPHQL_URL)
});

const query = `
    query getClip($clipId: ID!, $artworkSize: size) {
        node(id:$clipId) {
            ... on Clip {
                id
                episode {
                    title
                    podcast {
                        artwork(size:$artworkSize)
                    }
                }
                user {
                    displayName
                }
            }
        }
    }
`;


let template = (clip) => {
    const mp3Url = `https://s3-us-west-1.amazonaws.com/${S3_BUCKET}/${clip.id}.mp3`;
    return `
        <!DOCTYPE html>
        <head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# music: http://ogp.me/ns/music#">
          <meta content='text/html; charset=UTF-8' http-equiv='Content-Type'/>

          <meta property="fb:app_id"       content="929053407186638" />
          <meta property="og:type"         content="music.song" />
          <meta property="og:title"        content="Clip from ${clip.episode.title}" />
          <meta property="og:audio"        content="${mp3Url}" />
          <meta property="og:audio:type"   content="audio/vnd.facebook.bridge" />
          <meta property="og:image"        content="${clip.episode.podcast.artwork}" />

          <meta name="twitter:card" content="player">
          <meta name="twitter:site" content="@audienceam">
          <meta name="twitter:title" content="Clip from ${clip.episode.title}">
          <meta name="twitter:description" content="Clipped by ${clip.user.displayName} on Audience">
          <meta name="twitter:image" content="${clip.episode.podcast.artwork}">
          <meta name="twitter:player" content="https://yoursite.com/container.html">
          <meta name="twitter:player:width" content="480">
          <meta name="twitter:player:height" content="480">
          <meta name="twitter:player:stream" content="https://yoursite.com/example.mp4">
          <meta name="twitter:player:stream:content_type" content="video/mp4">
        </head>
        <html>
        <body>

        Oh hai, bot.

        </body>
        </html>

        `
};

export const renderClipForBots = (clipId) => {
    return client.query(query, {
        clipId,
        artworkSize: 'large'
    })
    .then(res => {
        console.info(res)
        return res.node
    })
    .then(clip => template(clip))
    .catch(err => console.error(`error fetching from graphql api: ${err}`));
    //return new Promise((resolve, reject) => {
    //    resolve(template())
    //});
};