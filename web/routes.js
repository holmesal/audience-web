import React from 'react';
import {
    IndexRoute,
    Route
} from 'react-router';

import Application from './components/Application';
import Landing from './components/Landing';
import SharedEpisode from './components/episode/SharedEpisode';
import Clip from './components/clip/Clip';

const sharedEpisodeQueries = {
    podcast: () => Relay.QL`query { node(id: $podcastId) }`,
    episode: () => Relay.QL`query { node(id: $episodeId) }`,
    user: () => Relay.QL`query { node(id: $userId) }`
};

const clipQueries = {
    clip: () => Relay.QL`query { node(id: $clipId) }`
};

export default (
    <Route path="/" component={Application}>
        <IndexRoute
            component={Landing}
        />
        <Route
            path="/clip/:clipId"
            component={Clip}
            queries={clipQueries}
        />
        <Route
            path="/:podcastId/:episodeId/:userId"
            component={SharedEpisode}
            queries={sharedEpisodeQueries}
        />
    </Route>
)