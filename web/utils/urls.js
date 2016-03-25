const {hostname, protocol} = window.location;

const localHostnames = ['localhost', '172.20.10.4'];

export const isStaging = hostname.toLowerCase().indexOf('staging') != -1;

export const API_ROOT = localHostnames.indexOf(hostname) === -1 ?
    (isStaging ? 'https://podcastfoo-staging.herokuapp.com' : 'https://podcastfoo.herokuapp.com') :
    `http://${hostname}:5000`;

export const S3_BUCKET = localHostnames.indexOf(hostname) === -1 ?
    'audience-clips' :
    'audience-clips-dev';