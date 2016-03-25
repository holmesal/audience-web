export const API_ROOT = window.location.origin.indexOf('localhost') === -1 ?
    'https://podcastfoo.herokuapp.com' :
    'http://localhost:5000';

export const S3_BUCKET = window.location.origin.indexOf('localhost') === -1 ?
    'audience-clips' :
    'audience-clips-dev';