import React, {Component} from 'react';
import Relay from 'react-relay';
import Radium from 'radium';

@Radium
export default class ClippedBy extends React.Component {

    render() {
        return (
            <div style={styles.wrapper}>
                I am the ClippedBy component!
            </div>
        );
    }
}

let styles = {
    wrapper: {
        display: 'flex'
    }
};

export default Relay.createContainer(ClippedBy, {
    fragments: {
        user: () => Relay.QL`
            fragment on User {
                id
                displayName
            }
        `
    }
});