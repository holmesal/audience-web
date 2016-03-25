export const S3_BUCKET = process.env.NODE_ENV === 'production' ?
    'audience-clips' :
    'audience-clips-dev';
console.info(`S3_BUCKET: ${S3_BUCKET}`);

export const GRAPHQL_URL = process.env.NODE_ENV === 'production' ?
    'https://podcastfoo.herokuapp.com/graphql-public' :
    'http://localhost:5000/graphql-public';
console.info(`GRAPHQL_URL: ${GRAPHQL_URL}`);
