import React, {Component} from 'react';
import { Link } from 'react-router';
import Radium from 'radium';
import Relay from 'react-relay';
import Player from './Player';
import ClippedBy from './ClippedBy';
import MiniEpisode from './MiniEpisode';

@Radium
class Clip extends React.Component {

    renderFullEpisodeLink() {
        return <div></div>;
        return <Link
                    style={styles.playEpisodeButton}
                    to={`listen/${this.props.clip.episode.id}`}
                >Play full episode</Link>;
    }

    render() {
        return (
            <div style={styles.container}>
                <div style={styles.wrapper}>
                    <div style={styles.main}>
                        <Player clip={this.props.clip}/>
                        <ClippedBy user={this.props.clip.user} />
                    </div>
                    {this.renderFullEpisodeLink()}
                    <MiniEpisode episode={this.props.clip.episode} />
                </div>
            </div>
        );
    }
}

let styles = {
    container: {
        display: 'flex',
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center'
    },
    wrapper: {
        display: 'flex',
        flex: 1,
        alignSelf: 'stretch',
        maxWidth: 296,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 28
    },
    main: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 300
    },
    playEpisodeButton: {
        alignSelf: 'stretch',
        borderRadius: 6,
        height: 44,
        border: '1px solid #D8D8D8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#D8D8D8',
        textDecoration: 'none'
    }
};

export default Relay.createContainer(Clip, {
    fragments: {
        clip: () => Relay.QL`
            fragment on Clip {
                id
                user {
                    ${ClippedBy.getFragment('user')}
                }
                ${Player.getFragment('clip')}
                episode {
                    id
                    ${MiniEpisode.getFragment('episode')}
                }
            }
        `
    }
});