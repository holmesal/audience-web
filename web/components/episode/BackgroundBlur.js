import React, {Component} from 'react';
import Radium from 'radium';
import Relay from 'react-relay';

@Radium
class BackgroundBlur extends React.Component {

    render() {
        return (
            <div style={styles.absoluteFill}>
                <div style={[styles.absoluteFill, styles.image, {backgroundImage: `url(${this.props.podcast.artwork})`}]}></div>
                <div style={[styles.absoluteFill, styles.overlay]}></div>
            </div>
        );
    }
}

let styles = {
    wrapper: {
        //backgroundColor: 'red'
    },
    absoluteFill: {
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        overflow: 'hidden'
    },
    image: {
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        filter: 'blur(100px)',
        marginLeft: -120,
        marginTop: -120,
        marginBottom: -120,
        marginRight: -120
    },
    overlay: {
        backgroundColor: '#3C3934',
        opacity: 0.5
    }
};

export default Relay.createContainer(BackgroundBlur, {
    initialVariables: {
        size: 'tiny'
    },
    fragments: {
        podcast: () => Relay.QL`
            fragment on Podcast {
                artwork(size:$size)
            }
        `
    }
})