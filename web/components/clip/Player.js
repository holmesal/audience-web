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

    state = {
        playing: false,
        progress: 0
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
        const audioUrl = `http://s3-us-west-1.amazonaws.com/audience-clips-dev/${this.props.clip.id}.mp3`;

        let opacity = this.state.playing ? 0.25 : (this.state.progress > 0 ? 0.1 : 0);
        return (
            <div
                style={styles.wrapper}
                onTouchTap={this.togglePlay.bind(this)}
            >
                <Motion defaultStyle={{progress: 0, opacity: 0}} style={{progress: spring(this.state.progress * 100), opacity: spring(opacity)}}>
                    {value => <ProgressLabel
                                style={Object.assign({}, styles.progress, {opacity: value.opacity})}
                                progress={value.progress}
                                size={100}
                                trackWidth={50}
                                progressWidth={50}
                                cornersWidth={0}
                                strokeWidth={4}
                                fillColor="transparent"
                                trailWidth={4}
                                trackColor="transparent"
                                progressColor="#D8D8D8"
                            />
                    }
                </Motion>
                <div style={styles.mask}></div>
                {this.renderIcon()}
                <audio
                    ref="audio"
                    onPlay={() => this.setState({playing: true})}
                    onPause={() => this.setState({playing: false})}
                    onEnded={() => this.setState({playing: false, progress: 0})}
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
let styles = {
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid #D8D8D8',
        width: buttonSize,
        height: buttonSize,
        borderRadius: buttonSize/2,
        position: 'relative'
    },
    icon: {
        fontSize: 34,
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
        backgroundColor: 'rgba(62,62,62,0.90)',
        width: maskSize,
        height: maskSize,
        borderRadius: maskSize / 2
    },
    progress: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    mask: {
        position: 'absolute',
        left: maskSize,
        top: maskSize,
        width: maskSize,
        height: maskSize,
        marginLeft: -maskSize/2,
        marginTop: -maskSize/2,
        backgroundColor: 'red',
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