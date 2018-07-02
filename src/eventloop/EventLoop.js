import React , { Component } from 'react';
import './eventloop.css';
import Container from './Container';
import Message from './Message';

class EventLoop extends Component{

    constructor(props) {
        super(props);
        this.state = {
            selector: -1,
            allProcess: 8,
            message: ''
        }
    }


    prevClick () {
        
        this.setState({
            selector: (this.state.selector < -1) ? this.state.allProcess : this.state.selector - 1
        })

        if(this.state.selector === 0) {
            this.setState({
                message: '一个脚本是一个任务，当浏览器加载完脚本后，便将它添加至事件队列当中'
            })
        }
    }

    nextClick () {
        
        this.setState({
            selector: (this.state.selector > this.state.allProcess) ? 0 : this.state.selector + 1
        })
        
    }

    addContainer() {

    }
    

    render(){
        const openBrace = '{';
        const closeBrace = '}';

        return (
            <div className="body">
                <div className="content">
                    <div className="code-source">
                        <span className={this.state.selector>=1 && this.state.selector<=2 ? 'selected' : ''}>console.log("script start");</span><br/><br/>
                        <span className={this.state.selector>=3 && this.state.selector<=4 ? 'selected' : ''}>setTimeout( function callback() {openBrace}</span><br/>
                        <span className={this.state.selector === 8 ? 'selected' : ''}>&nbsp;&nbsp;console.log("setTimemout");</span><br/>
                        {closeBrace}, 0); <br/><br/>
                        <span className={this.state.selector===5 ? 'selected' : ''}>console.log("script end")</span>
                    </div>
                    <div>
                        <div className="item">
                            <div className="queue-title">event queue</div>
                            <div className="queue-content">
                                <Container show={this.state.selector <= 5 && this.state.selector > -1} isHighlight={this.state.selector <= 5 && this.state.selector > -1} text={'script'}/>
                                <Container show={this.state.selector >= 4 && this.state.selector <= 6} text={'setTimeout callback'} />
                                <Container show={this.state.selector >6 && this.state.selector <= 8} isHighlight={this.state.selector > 6} text={'setTimeout callback'}/>
                            </div>
                        </div>
                        <div className="item">
                            <div className="queue-title">JS stack</div>
                            <div className="queue-content">
                                <Container show={this.state.selector <= 5 && this.state.selector > -1} isHighlight={this.state.selector <= 5 && this.state.selector > -1} text={'script'}/>
                                <Container show={this.state.selector <= 8 && this.state.selector > 6} isHighlight={this.state.selector <= 8 && this.state.selector > 6} text={'callback'}/>
                            </div>
                        </div>
                        <div className="item">
                            <div className="queue-title">log</div>
                            <div className="queue-content">
                                <Container show={this.state.selector >= 2} text={'script start'}/>
                                <Container show={this.state.selector >= 5} text={'script end'} />
                                <Container show={this.state.selector >= 8} text={'setTimeout'} />
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
            </div>
        )
    }
}

export default EventLoop