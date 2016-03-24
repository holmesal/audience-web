import React, {Component} from 'react';
import Relay from 'react-relay';
import Radium from 'radium'

import EpisodeCard from './EpisodeCard';
import BackgroundBlur from './BackgroundBlur';

@Radium
class SharedEpisode extends Component {

    render() {
        const avatarUrl = `http://graph.facebook.com/v2.5/${this.props.user.facebookId}/picture?type=square&height=168`;
        return (
            <div style={styles.wrapper}>
                <BackgroundBlur
                    podcast={this.props.podcast}
                />
                <div style={styles.card}>
                    <img style={styles.avatar} src={avatarUrl} />
                    <span style={styles.action}><span style={{fontWeight: 600}}>{this.props.user.displayName}</span><br />shared an episode with you:</span>

                    <EpisodeCard
                        episode={this.props.episode}
                        podcast={this.props.podcast}
                    />

                    <span style={styles.prompt}>To listen, visit this page on an iOS device with the Audience app installed.</span>
                    <a style={styles.button} target="_blank" href="http://eepurl.com/bQ7mC5">I don't have the app</a>
                </div>
            </div>
        );
    }
}

let styles = {
    wrapper: {
        display: 'flex',
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#202020',
        flexDirection: 'column',
        paddingLeft: 4,
        paddingRight: 4
    },
    card: {
        backgroundColor: '#fefefe',
        borderRadius: 9,
        paddingTop: 56,
        paddingRight: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        marginTop: 62,
        marginBottom: 62,
        boxSizing: 'border-box',
        width: '100%',
        maxWidth: 400,
        position: 'relative',
        color: '#3E3E3E',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0px 0px 4px 3px rgba(0,0,0,0.09)'
    },
    avatar: {
        position: 'absolute',
        top: 0,
        left: '50%',
        width: 84,
        height: 84,
        borderRadius: 42,
        marginLeft: -42,
        marginTop: -42,
        backgroundColor: '#dddddd',
        border: '1px solid #fefefe'
    },
    action: {
        fontSize: 16,
        lineHeight: '24px'
    },
    prompt: {
        fontStyle: 'italic',
        fontSize: 14,
        marginTop: 12,
        marginBottom: 12
    },
    button: {
        alignSelf: 'stretch',
        height: 42,
        backgroundColor: '#FFA726',
        textDecoration: 'none',
        color: '#fefefe',
        fontWeight: 500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        marginTop: 20,
        boxShadow: '0px 0px 2px 2px rgba(0,0,0,0.03)',
        ':hover': {
            backgroundColor: '#F09817'
        }
    }
};

export default Relay.createContainer(SharedEpisode, {
    fragments: {
        episode: () => Relay.QL`
            fragment on Episode {
                ${EpisodeCard.getFragment('episode')}
            }
        `,
        podcast: () => Relay.QL`
            fragment on Podcast {
                ${EpisodeCard.getFragment('podcast')}
                ${BackgroundBlur.getFragment('podcast')}
            }
        `,
        user: () => Relay.QL`
            fragment on User {
                displayName
                facebookId
            }
        `
    }
});
