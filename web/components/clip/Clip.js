import React, {Component} from 'react';
import Radium from 'radium';
import Relay from 'react-relay';
import Player from './Player';
import ClippedBy from './ClippedBy';

@Radium
class Clip extends React.Component {

    render() {
        return (
            <div style={styles.wrapper}>
                <div style={{display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Player clip={this.props.clip}/>
                </div>
                <ClippedBy user={this.props.clip.user} />
            </div>
        );
    }
}

let styles = {
    wrapper: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
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
            }
        `
    }
});