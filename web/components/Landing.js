import React, {Component} from 'react';
import LinkButton from './common/LinkButton';

export default class Landing extends Component {

    render() {
        return (
            <div style={styles.wrapper}>
                <p>A wild Audience appears!</p>
                <LinkButton to="http://pfoo.herokuapp.com" style={styles.button}>Join the Beta</LinkButton>
            </div>
        );
    }
}

let styles = {
    wrapper: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    button: {
        alignSelf: 'none',
        paddingLeft: 20,
        paddingRight: 20
    }
};