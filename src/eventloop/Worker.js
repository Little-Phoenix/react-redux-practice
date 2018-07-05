import React, { Component } from 'react';


class Worker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: ''
        }
    }

    componentDidMount() {
        var worker = new Worker('http://localhost/computing.js');
        
        worker.onmessage = function(event) {
            console.log(event.data)
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