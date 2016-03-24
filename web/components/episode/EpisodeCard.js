import React, {Component} from 'react';
import Radium from 'radium';
import Relay from 'react-relay';

@Radium
class EpisodeCard extends React.Component {

    render() {
        return (
            <div style={styles.wrapper}>
                <img style={styles.artwork} src={this.props.podcast.artwork} />
                <div style={styles.info}>
                    <span style={[styles.ellip, styles.episodeTitle]}>{this.props.episode.title}</span>
                    <span style={[styles.ellip, styles.podcastName]}>{this.props.podcast.name}</span>
                </div>
            </div>
        );
    }
}

let styles = {
    wrapper: {
        alignSelf: 'stretch',
        height: 64,
        backgroundColor: '#F6F6F6',
        borderRadius: 6,
        display: 'flex',
        flexDirection: 'row',
        marginTop: 24,
        marginBottom: 24,
        overflow: 'hidden'
    },
    artwork: {
        width: 64,
        backgroundColor: '#aaaaaa'
    },
    info: {
        flex: 1,
        paddingLeft: 12,
        justifyContent: 'center',
        alignItems: 'flex-start',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        textAlign: 'left'
    },
    ellip: {
        whiteSpace: 'nowrap',
        alignSelf: 'stretch',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    episodeTitle: {
        fontWeight: 500,
        color: '#3e3e3e',
        fontSize: 16,
        letterSpacing: 0.3,
        marginBottom: 6
    },
    podcastName: {
        fontWeight: 300,
        fontSize: 14,
        color: '#7C7C7C'
    }
};

export default Relay.createContainer(EpisodeCard, {
    initialVariables: {
        size: 'medium'
    },
    fragments: {
        episode: () => Relay.QL`
            fragment on Episode {
                title
            }
        `,
        podcast: () => Relay.QL`
            fragment on Podcast {
                name
                artwork(size:$size)
            }
        `
    }
})