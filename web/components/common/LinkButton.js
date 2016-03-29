import React, {Component} from 'react';
import Radium from 'radium';
import { Link } from 'react-router';

@Radium
export default class LinkButton extends React.Component {

    render() {
        return (
            <Link {...this.props} style={Object.assign({}, styles.button, this.props.style)}>
                {this.props.children}
            </Link>
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