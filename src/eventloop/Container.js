import React, { Component } from 'react';

class Container extends Component {

    render() {
        if(this.props.show){
            return (
                <span className={this.props.isHighlight ? 'queue-item queue-highlighted' : 'queue-item'}>
                    {this.props.text}
                </span>
            )
        } else {
            return (
                <span></span>
            )
        }
        
    }
}

export default Container;