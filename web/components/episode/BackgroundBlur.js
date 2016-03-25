import React, {Component} from 'react';
import Radium from 'radium';
import { Motion, spring } from 'react-motion';
import Relay from 'react-relay';

@Radium
class BackgroundBlur extends React.Component {

    state = {
        visible: false
    };

    handleLoad() {
        setTimeout(() => {
            this.setState({visible: true})
        }, 1000)
    }

    render() {
        let progress = this.state.visible ? 1 : 1;
        return (
            <Motion defaultStyle={{progress: 0}} style={{progress: spring(progress, {stiffness: 200, damping: 80})}}>
                {({progress}) => (
                    <div style={[styles.absoluteFill]}>
                        <img
                            src={this.props.podcast.artwork}
                            style={[styles.image, {transform: `translateZ(0) translateY(${-progress*16}px)`, opacity: progress}]}
                            onLoad={this.handleLoad.bind(this)}
                        />
                        <div style={[styles.absoluteFill, styles.overlay]}></div>
                    </div>
            )}</Motion>
        );
    }
}

let styles = {
    wrapper: {
        //backgroundColor: 'red'
    },
    absoluteFill: {
        position: 'fixed',
        top: '-50%',
        left: '-50%',
        bottom: '-50%',
        right: '-50%',
        overflow: 'hidden',
        zIndex: 0
    },
    imageWrapper: {

    },
    image: {
        filter: 'blur(4px)',
        //marginLeft: -120,
        //marginTop: -120,
        //marginBottom: -120,
        //marginRight: -120,
        transform: 'translateZ(0)',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        margin: 'auto',
        minWidth: '50%',
        minHeight: '50%'
    },
    overlay: {
        backgroundColor: 'rgba(62,62,62, 0.97)'
    }
};

export default Relay.createContainer(BackgroundBlur, {
    initialVariables: {
        size: 'large'
    },
    fragments: {
        podcast: () => Relay.QL`
            fragment on Podcast {
                artwork(size:$size)
            }
        `
    }
})