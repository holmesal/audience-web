import React, {Component} from 'react';
import Radium from 'radium';
import Relay from 'react-relay';
import Player from './Player';
import ClippedBy from './ClippedBy';
import MiniEpisode from './MiniEpisode';
import BackgroundBlur from '../episode/BackgroundBlur';
import PlayFullEpisodeButton from './PlayFullEpisodeButton';
import { Motion, spring } from 'react-motion';

@Radium
class Clip extends React.Component {

    state = {
        completed: false
    };

    renderFullEpisodeLink() {
        //return <div></div>;
        return
    }

    //componentDidMount() {
    //    setTimeout(() => {
    //       this.setState({completed: true})
    //    }, 2000)
    //}


    render() {
        return (
            <div style={styles.container}>
                <BackgroundBlur podcast={this.props.clip.episode.podcast} />
                <div style={styles.wrapper}>
                    <div style={styles.main}>
                        <Player
                            clip={this.props.clip}
                            onComplete={() => this.setState({completed: true})}
                        />
                        <ClippedBy user={this.props.clip.user} />
                    </div>
                    <PlayFullEpisodeButton
                        episode={this.props.clip.episode}
                        drawEyes={this.state.completed}
                    />
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
        justifyContent: 'center',
        flexDirection: 'column'
    },
    wrapper: {
        display: 'flex',
        flex: 1,
        maxWidth: 296,
        maxHeight: 500,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 28,
        zIndex: 10
    },
    main: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 300,
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
                    podcast {
                        ${BackgroundBlur.getFragment('podcast')}
                    }
                    ${MiniEpisode.getFragment('episode')}
                    ${PlayFullEpisodeButton.getFragment('episode')}
                }
            }
        `
    }
});