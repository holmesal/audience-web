import 'babel-polyfill';

import createHashHistory from 'history/lib/createHashHistory';
import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import { browserHistory } from 'react-router';
import { RelayRouter } from 'react-router-relay';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

// Use a custom (public) network layer
const apiRoot = window.location.origin.indexOf('localhost') === -1 ?
    'https://podcastfoo.herokuapp.com' :
    'http://localhost:5000';
console.info('using api root: ', apiRoot)
Relay.injectNetworkLayer(
    // Public (no auth)
    new Relay.DefaultNetworkLayer(`${apiRoot}/graphql-public`)

    //// Authed (hardcoded for now)
    //new Relay.DefaultNetworkLayer(`${window.location.origin}/graphql`, {
    //  headers: {
    //    Authorization: `Bearer ${getAuthToken()}`
    //  }
    //})
);

import routes from './routes';

//const history = useRouterHistory(createHashHistory)({ queryKey: false });

//const mountNode = document.createElement('div');
//document.body.appendChild(mountNode);
const mountNode = document.getElementById('root')

ReactDOM.render(
    <RelayRouter history={browserHistory} routes={routes} />,
    mountNode
);