import React, { Component } from 'react';

class Message extends Component{

    render() {
        return (
            <span>
                {this.props.message}
            </span>
        )
    }
}

export default Message;