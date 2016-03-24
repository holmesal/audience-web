import React, {Component} from 'react';
import { Link } from 'react-router';

export default class Landing extends Component {

    render() {
        return (
            <div style={style.wrapper}>
                <p>A wild Audience appears!</p>
                <p><a href="http://eepurl.com/bQ7mC5">Join the Beta</a></p>
            </div>
        );
    }
}

let style = {
    wrapper: {
        display: 'flex',
        flexDirection: 'column'
    }
};