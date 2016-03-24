import Relay from 'react-relay';

export default class extends Relay.Route {
  static queries = {
    viewer: () => Relay.QL`
      query {
        viewer
      }
    `,
    examplePodcast: () => Relay.QL`
      query {
        node(id:"UG9kY2FzdDoy")
      }
    `
  };
  static routeName = 'AppHomeRoute';
}
