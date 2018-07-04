import React, { Component } from 'react';


class Worker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: ''
        }
    }

    componentDidMount() {
        var worker = new Worker('computing.js');
        console.log('worker', worker)
        worker.onmessage = function(event) {
            this.setState({
                message: event.data + '<br/>'
            })
        }
    }

    render() {
        return (
            <div id="result">
                
            </div>
        )
    }
}

export default Worker