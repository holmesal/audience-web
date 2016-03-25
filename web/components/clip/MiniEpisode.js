import React, {Component} from 'react';
import Relay from 'react-relay';
import Radium from 'radium';

@Radium
export default class MiniEpisode extends React.Component {

    render() {
        return (
            <div style={styles.wrapper}>
                <img
                    style={styles.artwork}
                    src={this.props.episode.podcast.artwork}
                />
                <span style={styles.info}><span style={styles.title}>{this.props.episode.title}</span> - {this.props.episode.podcast.name}</span>
            </div>
        );
    }
}

const artworkSize = 24;
let styles = {
    wrapper: {
        display: 'flex',
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: 32,
        marginBottom: 32,
        flexShrink: 0
    },
    artwork: {
        width: artworkSize,
        height: artworkSize,
        borderRadius: artworkSize/2,
        backgroundColor: '#545454',
        marginRight: 12
    },
    info: {
        flex: 1,
        paddingTop: 3,
        fontSize: 14,
        fontWeight: 300,
        color: '#d8d8d8',
        letterSpacing: 0.26
    },
    title: {
        fontWeight: 500
    }
};

export default Relay.createContainer(MiniEpisode, {
    initialVariables: {
        size: 'small'
    },
    fragments: {
        episode: () => Relay.QL`
            fragment on Episode {
                title
                podcast {
                    name
                    artwork(size:$size)
                }
            }
        `
    }
});