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

        this.setMessage();
        
    }

    setMessage () {
        console.log(this.state.selector)
        if(this.state.selector === -1) {
            this.setState({
                message: '一个脚本是一个任务，当浏览器加载完脚本后，便将它添加至事件队列当中'
            })
        } else if (this.state.selector === 2){
            this.setState({
                message: '这里延迟时间会立即结束，于是乎浏览器的事件表将回调函数添加至事件队列中'
            })
        } else if (this.state.selector === 4) {
            this.setState({
                message: '这时当前脚本执行完毕，弹出执行栈'
            })
        } else if (this.state.selector === 5) {
            this.setState({
                message: '当执行栈为空时，便检查事件队列，如果不为空，则取出第一个任务执行'
            })
        } else if (this.state.selector === 8) {
            this.setState({
                message: '结束'
            })
        } else {
            this.setState({
                message: ''
            })
        }
    }

    nextClick () {
        
        this.setState({
            selector: (this.state.selector > this.state.allProcess) ? 0 : this.state.selector + 1
        })
        this.setMessage();
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