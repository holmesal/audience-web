import express from 'express';
import {renderClip} from './clip';

let app = express();

app.use(express.static('example'));

app.get('/clip/:clipId', (req, res) => {
    console.info('got clip request!', req.params);
    renderClip(req.params.clipId).then(clip => res.end(clip));
});

// Start the server
const APP_PORT = process.env.PORT || 8082; // heroku has dynamic ports
app.listen(APP_PORT, () => {
    console.log(`App is now running on http://localhost:${APP_PORT}`);
});
