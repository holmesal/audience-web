import React, {Component} from 'react';
import Relay from 'react-relay';
import Radium from 'radium';
import { S3_BUCKET } from '../../utils/urls';
import MdPlayArrow from 'react-icons/lib/md/play-arrow';
import MdPause from 'react-icons/lib/md/pause';
import ProgressLabel from 'react-progress-label';
import { Motion, spring } from 'react-motion';

@Radium
class Player extends React.Component {

    propTypes: {
      onComplete: React.PropTypes.func
    }

    state = {
        playing: false,
        progress: 0,
        onComplete: () => {}
    };

    togglePlay() {
        console.info('toggling play!');
        if (this.state.playing) this.refs.audio.pause();
        else this.refs.audio.play();

    }

    handleTimeUpdate(ev) {
        const progress = ev.target.currentTime / ev.target.duration;
        this.setState({progress});
    }

    renderIcon() {
        const icon = this.state.playing ?
            <MdPause style={styles.icon} /> :
            <MdPlayArrow style={styles.icon} />;
        return (
            <div style={styles.iconLayer}>
                <div style={styles.iconWrapper}>
                    {icon}
                </div>
            </div>
        )
    }

    render() {
        const audioUrl = `https://s3-us-west-1.amazonaws.com/${S3_BUCKET}/${this.props.clip.id}.mp3`;

        let opacity = this.state.playing ? 1 : (this.state.progress > 0 ? 0.1 : 0);
        return (
            <div
                style={styles.wrapper}
                onTouchTap={this.togglePlay.bind(this)}
            >
                <Motion defaultStyle={{progress: 0, opacity: 0}} style={{progress: spring(this.state.progress * 100), opacity: spring(opacity)}}>
                    {value => <ProgressLabel
                                style={Object.assign({}, styles.progress, {opacity: value.opacity})}
                                progress={value.progress}
                                size={buttonSize + drad}
                                trackWidth={2}
                                progressWidth={2}
                                cornersWidth={0}
                                strokeWidth={4}
                                fillColor="transparent"
                                trailWidth={4}
                                trackColor="transparent"
                                progressColor="rgba(111,167,209,1)"
                            />
                    }
                </Motion>
                <div style={styles.mask}></div>
                {this.renderIcon()}
                <audio
                    ref="audio"
                    onPlay={() => this.setState({playing: true})}
                    onPause={() => this.setState({playing: false})}
                    onEnded={() => {
                        this.props.onComplete();
                        this.setState({playing: false, progress: 0});
                    }}
                    onError={() => this.setState({playing: false})}
                    onTimeUpdate={this.handleTimeUpdate.bind(this)}
                    preload
                >
                    <source src={audioUrl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            </div>
        );
    }
}

const maskSize = 50;
const buttonSize = 100;
const drad = 30;
let styles = {
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid #D8D8D8',
        width: buttonSize,
        height: buttonSize,
        borderRadius: buttonSize/2,
        position: 'relative',
        ':hover': {
            cursor: 'pointer',
            backgroundColor: 'rgba(62,62,62,0.99)'
        }
    },
    icon: {
        fontSize: 40,
        color: '#D8D8D8'
    },
    iconLayer: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(62,62,62,0)',
        width: maskSize,
        height: maskSize,
        borderRadius: maskSize / 2
    },
    progress: {
        position: 'absolute',
        top: -drad/2,
        left: -drad/2,
        bottom: -drad/2,
        right: -drad/2,
    },
    mask: {
        position: 'absolute',
        left: maskSize,
        top: maskSize,
        width: maskSize,
        height: maskSize,
        marginLeft: -maskSize/2,
        marginTop: -maskSize/2,
        //backgroundColor: 'red',
        zIndex: -1
    }
};

export default Relay.createContainer(Player, {
    fragments: {
        clip: () => Relay.QL`
            fragment on Clip {
                id
            }
        `
    }
});