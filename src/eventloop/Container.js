import React, { Component } from 'react';

class Container extends Component {


    constructor(props) {
        super(props);
        this.state = {
            transitionClass: 'item-transition',
            highlightClass: 'queue-highlighted',
            defaultClass: 'queue-item',
            fadeinClass: 'fadein',
            fadeoutClass: 'fadeout',
            spanClass: []
        }

        
    }

    componentWillReceiveProps(props) {
        var arr = [];
        if(props.show) {
            
            if (props.isHighlight) {
                arr.push(this.state.transitionClass);
                arr.push(this.state.defaultClass);
                arr.push(this.state.highlightClass);
                arr.push(this.state.fadeinClass)

                this.setState({
                    spanClass: arr
                })
            } else {
                arr = [];
                arr.push(this.state.transitionClass);
                arr.push(this.state.defaultClass);
                arr.push(this.state.fadeinClass)
                this.setState({
                    spanClass: arr
                })
            }
        } else {
            arr = [];
            arr.push(this.state.transitionClass);
            arr.push(this.state.fadeoutClass);
            this.setState({
                spanClass: arr
            })
        }
    }

    render() {
        return (
            <span className={this.state.spanClass.join(" ")}>
                {this.props.text}
            </span>
        )
        
    }
}

export default Container;