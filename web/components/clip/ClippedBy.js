import React, {Component} from 'react';
import Relay from 'react-relay';
import Radium from 'radium';

@Radium
export default class ClippedBy extends React.Component {

    render() {
        const photoUrl = `http://graph.facebook.com/v2.5/${this.props.user.facebookId}/picture?type=square&height=${photoSize * 2}`;
        return (
            <div style={styles.wrapper}>
                <div style={[styles.profilePhoto, {backgroundImage: `url(${photoUrl})`}]}></div>
                <span style={styles.text}>clipped by <span style={styles.name}>{this.props.user.displayName}</span></span>
            </div>
        );
    }
}

const photoSize = 28;

let styles = {
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20
    },
    text: {
        fontSize: 14,
        fontWeight: 300
    },
    name: {
        fontWeight: 500
    },
    profilePhoto: {
        width: photoSize,
        height: photoSize,
        borderRadius: photoSize/2,
        backgroundColor: '#545454',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        letterSpacing: 0.26,
        marginRight: 12
    }
};

export default Relay.createContainer(ClippedBy, {
    fragments: {
        user: () => Relay.QL`
            fragment on User {
                id
                displayName
                facebookId
            }
        `
    }
});