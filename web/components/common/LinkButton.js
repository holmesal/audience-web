import React, {Component} from 'react';
import Radium from 'radium';
import { Link } from 'react-router';

@Radium
export default class LinkButton extends React.Component {

    static defaultProps = {
        forcePageReload: false
    };

    handleTransition(ev) {
        if (this.props.forcePageReload) {
            window.location = `${window.location.origin}${this.props.to}`;
            ev.preventDefault();
        }
    }

    render() {
        return (
            <Link
                {...this.props}
                style={Object.assign({}, styles.button, this.props.style)}
                onClick={this.handleTransition.bind(this)}
            >
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