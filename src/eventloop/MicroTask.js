import React, { Component } from 'react'
import './eventloop.css'
import Message from './Message'

class MicroTask extends Component {

    constructor (props) {
        super(props);

        this.state = {
            message: '',
            codeSourceStyle: {
                height: '320px'
            }
        }
    }

    prevClick () {

    }

    nextClick () {

    }

    render () {
        const openBrace = '{';
        const closeBrace = '}';

        return (
            <div className="body">
                <div className="content">
                    <div className="code-source" style={this.state.codeSourceStyle}>
                        <span>console.log('script start');</span><br/><br/>

                        <span>setTimeout(function() {openBrace}</span><br/>
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;console.log('setTimeout');</span><br/>
                        {closeBrace},0);<br/><br/>

                        <span>Promise.resolve().then(function() {openBrace})</span><br/>
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;console.log('promise1');</span><br/>
                        {closeBrace}).then(function() {openBrace}<br/>
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;console.log('promise2');</span><br/>
                        {closeBrace});<br/><br/>

                        <span>console.log('script end');</span><br/>
                    </div>
                    <div className="item">
                        <div className="queue-title">task</div>
                        <div className="queue-content">
                        
                        </div>
                    </div>
                    <div className="item">
                        <div className="queue-title">microtask</div>
                        <div className="queue-content">

                        </div>
                    </div>
                    <div className="item">
                        <div className="queue-title">JS stack</div>
                        <div className="queue-content">

                        </div>
                    </div>
                    <div className="item">
                        <div className="queue-title">log</div>
                        <div className="queue-content">

                        </div>
                    </div>

                    <div className="last-item">
                        <div className="btn prev" onClick={ this.prevClick.bind(this) }>prev</div>
                        <div className="btn next" onClick={ this.nextClick.bind(this) }>next</div>
                    </div>
                    
                    <div className="alert-window">
                        <Message message={this.state.message}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default MicroTask