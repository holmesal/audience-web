import React, {Component, PropTypes} from 'react';
import Relay from 'react-relay';
import Radium from 'radium';
import LinkButton from '../common/LinkButton';
import { Motion, spring } from 'react-motion';
import chroma from 'chroma-js';

@Radium
class PlayFullEpisodeButton extends React.Component {

    static propTypes = {
        drawEyes: PropTypes.bool
    };

    static defaultProps = {
        drawEyes: false
    };

    render() {
        let progress = this.props.drawEyes ? 1 : 0;
        return (
            <Motion defaultStyle={{progress: 0}} style={{progress: spring(progress, {stiffness: 247, damping: 50})}}>
                {({progress}) => <LinkButton
                            style={{
                                transform: `translateY(-${progress * 5}px) rotate(-0.0000000001deg)`,
                                backgroundColor: chroma.interpolate('rgba(0,0,0,0)', 'rgba(80,171,241,0.95)', progress).css(),
                                borderColor: chroma.interpolate('rgba(216,216,216,0.6)', 'rgba(80,171,241,0.95)', progress).css(),
                                color: chroma.interpolate('#D8D8D8', '#FEFEFE', progress),
                            }}
                            to={`/listen/${this.props.episode.id}`}
                        >
                            Play full episode
                        </LinkButton>}
            </Motion>
        );
    }
}

let styles = {
    button: {
        alignSelf: 'stretch',
        borderRadius: 4,
        height: 44,
        border: '1px solid',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#D8D8D8',
        textDecoration: 'none',
        flexShrink: 0,
        ':hover': {
            cursor: 'pointer'
        }
    }
};

export default Relay.createContainer(PlayFullEpisodeButton, {
    fragments: {
        episode: () => Relay.QL`
            fragment on Episode {
                id
            }
        `
    }
});